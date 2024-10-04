import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebRTCServiceService } from '../../../services/WebRTCService/web-rtcservice.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent{

  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('remoteVideo') remoteVideo: ElementRef;

  isInCall: boolean = false;
  isCallIncoming: boolean = false;
  userId: string;
  tutorId: string;
  private subscriptions: Subscription[] = [];
  private incomingCallerId: string | null = null;

  constructor(private webRTCService: WebRTCServiceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.tutorId = params['tutorId'];
      
      // Now you can use these IDs to set up the call
      this.webRTCService.setUser(this.userId, 'student');
      console.log('User ID:', this.userId);
      console.log('Tutor ID:', this.tutorId);
    });
    this.webRTCService.setUser(this.userId, 'student');

    this.subscriptions.push(
      this.webRTCService.callStatus$.subscribe(status => {
        this.isInCall = status === 'ongoing';
        this.isCallIncoming = status === 'incoming';
        if (status === 'idle') {
          this.remoteVideo.nativeElement.srcObject = null;
          this.localVideo.nativeElement.srcObject = null;
          this.incomingCallerId = null;
        }
      }),
      this.webRTCService.remoteStream$.subscribe(stream => {
        if (stream) {
          this.remoteVideo.nativeElement.srcObject = stream;
        }
      }),
      this.webRTCService.incomingCall$.subscribe(callerId => {
        this.incomingCallerId = callerId;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async initiateCall() {
    try {
      await this.webRTCService.startCall(this.tutorId);
      this.localVideo.nativeElement.srcObject = this.webRTCService.getLocalStream();
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  }

  async answerIncomingCall() {
    if (!this.incomingCallerId) {
      console.error('No incoming call to answer');
      return;
    }
    try {
      await this.webRTCService.answerCall(this.incomingCallerId);
      this.localVideo.nativeElement.srcObject = this.webRTCService.getLocalStream();
    } catch (error) {
      console.error('Failed to answer call:', error);
    }
  }

  endCurrentCall() {
    this.webRTCService.endCall();
  }
}
