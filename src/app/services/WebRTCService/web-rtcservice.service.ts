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
  private pendingCandidates: RTCIceCandidateInit[] = [];
  private incomingCallData: { offer: RTCSessionDescriptionInit, from: string } | null = null;
  private remoteOffer: RTCSessionDescription | null = null;


  remoteStream$ = new Subject<MediaStream>();
  incomingCall$ = new Subject<string>();
  callStatus$ = new BehaviorSubject<'idle' | 'incoming' | 'ongoing'>('idle');

  private userId: string;
  private remoteUserId: string;
  private userRole: 'student' | 'tutor';

  config: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  }


  constructor() {
    this.socket = io(environment.SOCKET_IO_URL);
    this.setupSocketListeners();
  }

  setUser(id: string, role: 'student' | 'tutor') {
    this.userId = id;
    this.userRole = role;
  }
  setRemoteUser(id: string, role: 'student' | 'tutor') {
    this.remoteUserId = id;
    this.userRole = role;
  }

  private setupSocketListeners() {
    this.socket.on('offer', (data: { offer: RTCSessionDescriptionInit, from: string }) => {
      console.log('Received offer from:', data.from);
      this.incomingCallData = data;
      this.remoteUserId = data.from;
      this.callStatus$.next('incoming');
      this.incomingCall$.next(data.from);
    });

    this.socket.on('answer', async (data: { answer: RTCSessionDescriptionInit, from: string }) => {
      console.log('Received answer from:', data.from);
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        this.callStatus$.next('ongoing');
        this.processPendingCandidates();
      }
    });

    this.socket.on('ice-candidate', async (data: { candidate: RTCIceCandidateInit, from: string }) => {
      console.log('Received ICE candidate from:', data.from);
      await this.handleIceCandidate(data.candidate);
    });
    
    this.socket.on('end-call', (data: { from: string }) => {
      console.log('Call ended by remote peer:', data.from);
      this.endCall(false);
    });

    this.socket.on('call-failed', (data: { reason: string }) => {
      console.error('Call failed:', data.reason);
      this.callStatus$.next('idle');
    });
  }

  private async handleIceCandidate(candidate: RTCIceCandidateInit) {
    if (this.peerConnection && this.peerConnection.remoteDescription) {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } else {
      console.log('Storing ICE candidate');
      this.pendingCandidates.push(candidate);
    }
  }

  private async processPendingCandidates() {
    if (this.peerConnection && this.peerConnection.remoteDescription) {
      console.log('Processing pending candidates');
      while (this.pendingCandidates.length > 0) {
        const candidate = this.pendingCandidates.shift();
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate!));
      }
    }
  }



  private async createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.config);
  
    this.peerConnection.ontrack = (event) => {
      console.log('Received remote track');
      this.remoteStream$.next(event.streams[0]);
    };
  
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.remoteUserId) {
        console.log('Sending ICE candidate');
        this.socket.emit('ice-candidate', {
          candidate: event.candidate.toJSON(),
          from: this.remoteUserId
        });
      }
    };
  
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });
    }
  }



  async startCall(targetUserId: string) {
    console.log('Starting call to:', targetUserId);
    this.remoteUserId = targetUserId;
    await this.startLocalStream();
    await this.createPeerConnection();
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    this.socket.emit('offer', { offer, from: this.remoteUserId });
    console.log(`"Offer emitted from the ${this.userRole} side"`);
    
  }
//await this.peerConnection.createAnswer();
  async answerCall() {
    if (this.callStatus$.value !== 'incoming' || !this.incomingCallData) {
      console.error('No incoming call to accept');
      return;
    }
    
    try {
      await this.startLocalStream();
      await this.createPeerConnection();

      const { offer, from } = this.incomingCallData;
      await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(offer));
      
      console.log('Remote description set, creating answer');
      const answer = await this.peerConnection!.createAnswer();
      await this.peerConnection!.setLocalDescription(answer);
    
      this.socket.emit('answer', { answer, from: this.remoteUserId });
      console.log('Answer emitted from the callee side');
      this.callStatus$.next('ongoing');
      
      this.processPendingCandidates();
    } catch (error) {
      console.error('Error accepting call:', error);
      this.callStatus$.next('idle');
    } finally {
      this.incomingCallData = null;
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
      this.socket.emit('end-call', { from: this.remoteUserId});
    }
    
    this.callStatus$.next('idle');
    
    setTimeout(() => {
      this.isEndingCall = false;
    }, 1000);
  }

   async startLocalStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
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
