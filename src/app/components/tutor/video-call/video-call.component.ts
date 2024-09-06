import { Component, ElementRef, ViewChild } from '@angular/core';
import { CallService } from '../../../services/videoServices/call/call.service';
import { SignallingService } from '../../../services/videoServices/signalling/signalling.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class tutorVideoCallComponent {
  @ViewChild('remoteVideo') remoteVideo: ElementRef;

  constructor(
    private callService: CallService,
    private signalingService: SignallingService
  ) {}

  ngOnInit(): void {
    this.signalingService
      .getMessages()
      .subscribe((payload) => this._handleMessage(payload));
  }

  public async makeCall(): Promise<void> {
    await this.callService.makeCall(this.remoteVideo);
  }

  private async _handleMessage(data): Promise<void> {
    switch (data.type) {
      case 'offer':
        await this.callService.handleOffer(data.offer, this.remoteVideo);
        break;

      case 'answer':
        await this.callService.handleAnswer(data.answer);
        break;

      case 'candidate':
        this.callService.handleCandidate(data.candidate);
        break;

      default:
        break;
    }
  }
}
