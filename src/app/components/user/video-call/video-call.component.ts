import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebRTCServiceService } from '../../../services/WebRTCService/web-rtcservice.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent implements OnInit {

  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  isCallIncoming = false;

  constructor(private webRTCService: WebRTCServiceService) {}

  ngOnInit() {
    this.webRTCService.remoteStream$.subscribe(stream => {
      this.remoteVideo.nativeElement.srcObject = stream;
    });

    this.webRTCService.incomingCall$.subscribe(() => {
      this.isCallIncoming = true;
      alert('Incoming call! Click "Answer Call" to accept.');
    });
  }

  async startLocalStream() {
    const stream = await this.webRTCService.startLocalStream();
    this.localVideo.nativeElement.srcObject = stream;
  }

  endLocalStream() {
    this.webRTCService.endLocalStream();
    this.localVideo.nativeElement.srcObject = null;
  }

  startCall() {
    this.webRTCService.startCall();
  }

  answerCall() {
    if (this.isCallIncoming) {
      this.webRTCService.answerCall();
      this.isCallIncoming = false;
    } else {
      alert('No incoming call to answer.');
    }
  }

  endCall() {
    this.webRTCService.endCall();
    this.remoteVideo.nativeElement.srcObject = null;
  }
}
