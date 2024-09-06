import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { map, Observable } from 'rxjs';
import { ChatMessage } from '../../interfaces/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket = inject(Socket);

  constructor() { }

  joinChat(userId: string, userType: string){
    if(userId){
      //console.log(`i'm joining user chat, inisde chat service`);
    }
    this.socket.emit('joinChat', {userId, userType });
  }

  sendMessage(userId: string, senderType: string, message: string){
    this.socket.emit('sendMessage', {userId, senderType,message});
  }

  getMessages() : Observable<ChatMessage> {
    //console.log('inside chatservice getMesages'); 
    return new Observable<ChatMessage>(observer=>{
      this.socket.on('messageReceived', (data: ChatMessage)=>{
        //console.log('user received message: ', data);
        
        observer.next(data);
      });

      return()=> this.socket.off('messageReceived');
    }).pipe(map(data=> data))
  }

  getOnlineUsers(): Observable<string[]> {
    return new Observable<string[]>(observer =>{
      const handler = (data: string[])=>{
        observer.next(data);
      };

      this.socket.on('onlineUsers', handler);

      return ()=>{
        this.socket.off('onlineUsers');
      }
        
    })
  }

  disconnect() {
    this.socket.disconnect();
  }

  connect(){
    this.socket.connect();
  }
}
