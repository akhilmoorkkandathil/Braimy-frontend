import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebRTCServiceService {
  private socket: Socket;
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  remoteStream$ = new Subject<MediaStream>();
  incomingCall$ = new Subject<void>();

  constructor() {
    this.socket = io('http://localhost:8000');
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
      this.incomingCall$.next();
      await this.createPeerConnection();
      await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(offer));
    });

    this.socket.on('answer', async (answer: RTCSessionDescriptionInit) => {
      await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(answer));
    });

    this.socket.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      await this.peerConnection!.addIceCandidate(new RTCIceCandidate(candidate));
    });

    this.socket.on('end-call', () => {
      this.endCall();
    });
  }

  private async createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    this.peerConnection.ontrack = (event) => {
      this.remoteStream$.next(event.streams[0]);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('ice-candidate', event.candidate);
      }
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection!.addTrack(track, this.localStream!);
      });
    }
  }

  async startLocalStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    return this.localStream;
  }

  endLocalStream() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
  }

  async startCall() {
    await this.createPeerConnection();
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    this.socket.emit('offer', offer);
  }

  async answerCall() {
    if (!this.peerConnection) {
      await this.createPeerConnection();
    }
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);
    this.socket.emit('answer', answer);
  }

  endCall() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    this.remoteStream$.next(null);
    this.socket.emit('end-call');
  }
}
