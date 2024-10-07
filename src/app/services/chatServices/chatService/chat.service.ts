import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { ChatMessage } from '../../../interfaces/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = inject(Socket);

  constructor() { }

  joinChat(userId: string, userType: string) {
    if (userId) {
      console.log(`User joining chat: ${userId}, type: ${userType}`);
    }
    this.socket.emit('joinChat', { userId, userType });
  }

  sendMessage(Message:ChatMessage) {
    this.socket.emit('sendMessage', Message);
  }

  getMessages(): Observable<ChatMessage> {
    console.log('Subscribing to messages');
    return new Observable<ChatMessage>(observer => {
      this.socket.on('messageReceived', (data: ChatMessage) => {
        console.log('Message received:', data);
        observer.next(data);
      });

      // Cleanup on unsubscription
      return () => this.socket.off('messageReceived');
    });
  }

  disconnect() {
    console.log('Disconnecting socket');
    this.socket.disconnect();
  }

  connect() {
    console.log('Connecting socket');
    this.socket.connect();
  }
}
