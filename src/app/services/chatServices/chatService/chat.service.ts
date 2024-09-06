import { Injectable, inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, map } from 'rxjs';
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

  sendMessage(userId: string, tutorId: string, senderType: string, message: string) {
    console.log(`Sending message: ${message}, from ${senderType} to ${userId || tutorId}`);
    this.socket.emit('sendMessage', { userId, tutorId, senderType, message });
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
  getLastMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('lastMessage', (data) => {
        console.log('Last message received:', data);
        observer.next(data);
      });

      return () => this.socket.off('lastMessage');
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
