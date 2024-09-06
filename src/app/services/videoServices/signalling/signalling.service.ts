import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignallingService {

  constructor(private socket: Socket) {}

  joinVideoRoom(roomId: string, userId: string, userType: string){
    this.socket.emit('joinVideoCall', {userId, userType, roomId });
  }

  getMessages(): Observable<any> {
    return this.socket.fromEvent('message');
  }

  sendMessage(payload): void {
    this.socket.emit('send-message', payload);
  }
  
}
