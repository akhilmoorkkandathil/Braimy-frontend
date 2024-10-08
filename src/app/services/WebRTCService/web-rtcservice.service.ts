import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class WebRTCServiceService {
  private socket: Socket;
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private isEndingCall: boolean = false;

  remoteStream$ = new Subject<MediaStream>();
  incomingCall$ = new Subject<string>();
  callStatus$ = new BehaviorSubject<'idle' | 'incoming' | 'ongoing'>('idle');

  private userId: string;
  private userRole: 'student' | 'tutor';

  constructor() {
    this.socket = io(environment.SOCKET_IO_URL);
    this.setupSocketListeners();
  }

  setUser(id: string, role: 'student' | 'tutor') {
    this.userId = id;
    this.userRole = role;
  }

  private setupSocketListeners() {
    this.socket.on('offer', async (data: { offer: RTCSessionDescriptionInit, from: string }) => {
      console.log('Received offer from:', data.from);
      this.callStatus$.next('incoming');
      this.incomingCall$.next(data.from);
      
      try {
        await this.startLocalStream();
        await this.createPeerConnection();
        await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(data.offer));
        
        const answer = await this.peerConnection!.createAnswer();
        await this.peerConnection!.setLocalDescription(answer);
        
        this.socket.emit('answer', { answer, from: this.userId, to: data.from });
        
        this.callStatus$.next('ongoing');
      } catch (error) {
        console.error('Error handling offer:', error);
        this.callStatus$.next('idle');
      }
    });

    this.socket.on('answer', async (data: { answer: RTCSessionDescriptionInit, from: string }) => {
      console.log('Received answer from:', data.from);
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        this.callStatus$.next('ongoing');
      }
    });

    this.socket.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      console.log('Received ICE candidate:', candidate);
      
      // Check if candidate is valid
      if (candidate && candidate.sdpMid !== null && candidate.sdpMLineIndex !== null) {
        if (this.peerConnection) {
          // Ensure remote description is set before adding ICE candidates
          if (this.peerConnection.remoteDescription) {
            try {
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
              console.log('ICE candidate added successfully');
            } catch (error) {
              console.error('Error adding ICE candidate:', error);
            }
          } else {
            console.warn('Remote description not set yet. Storing candidate.');
            // Optionally store the candidate to add it later when the remote description is set.
          }
        }
      } else {
        console.error('Invalid ICE candidate:', candidate);
      }
    });
    

    this.socket.on('end-call', (data: { from: string }) => {
      console.log('Call ended by remote peer:', data.from);
      if (!this.isEndingCall) {
        this.endCall(false);
      }
    });

    this.socket.on('call-failed', (data) => {
      console.error('Call failed:', data.reason);
      this.callStatus$.next('idle');
    });
  }

  private async createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // Add your TURN server configuration here if needed
      ]
    });

    this.peerConnection.ontrack = (event) => {
      console.log('Received remote track');
      this.remoteStream$.next(event.streams[0]);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        
        console.log('Sending ICE candidate');
        this.socket.emit('ice-candidate', { candidate: event.candidate, to: this.userId === this.userId ? this.userId : this.userId });
      }
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection!.addTrack(track, this.localStream!);
      });
    }
  }

  async startCall(targetUserId: string) {
    console.log('Starting call to:', targetUserId);
    await this.startLocalStream();
    await this.createPeerConnection();
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    this.socket.emit('offer', { offer, from: this.userId, to: targetUserId });
    this.callStatus$.next('ongoing');
  }

  async answerCall(callerId: string) {
    console.log('Answering call from:', callerId);
    if (this.peerConnection && this.peerConnection.remoteDescription) {
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.socket.emit('answer', { answer, from: this.userId, to: callerId });
      this.callStatus$.next('ongoing');
    } else {
      console.error('Cannot answer call: No offer received or peer connection not established');
    }
  }

  endCall(emitEvent: boolean = true) {
    if (this.isEndingCall) return;
  
    console.log('Ending call');
    this.isEndingCall = true;
  
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    this.endLocalStream();
    this.remoteStream$.next(null);
    
    if (emitEvent) {
      this.socket.emit('end-call', { from: this.userId, to: this.userId === this.userId ? this.userId : this.userId });
    }
    
    this.callStatus$.next('idle');
    
    setTimeout(() => {
      this.isEndingCall = false;
    }, 1000);
  }

  private async startLocalStream() {
    if (!this.localStream) {
      console.log('Starting local stream');
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    }
    return this.localStream;
  }

  private endLocalStream() {
    if (this.localStream) {
      console.log('Ending local stream');
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
  }

  getLocalStream() {
    return this.localStream;
  }
}
