import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChatService } from '../../../../services/chatServices/chatService/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TutorService } from '../../../../services/tutorService/tutor.service';
import { Tutor } from '../../../../interfaces/tutor';
import { ChatMessage } from '../../../../interfaces/chatMessage';
import { UserChatService } from '../../../../services/chatServices/userChatService/user-chat.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css',
})
export class ChatLayoutComponent implements OnInit {

  userInput=''
  userId = '';
  tutorList:Tutor[];
  tutorId=''
  userType = "User";
  messages: ChatMessage[] = [];
  showEmojiPicker: boolean = false;

  constructor(
    private chatService:ChatService, 
    private tutorService:TutorService,
    private userChatservice:UserChatService
  ){}


  ngOnInit(): void {
      this.chatService.connect()
      this.userId = localStorage.getItem('userId');
      this.fetchTutors();
      this.getMessages();
  }


  fetchTutors(){
    this.tutorService.getStudentTutor().subscribe((res)=>{
      this.tutorList = res.data;
    })
  }
  toggleEmojiPicker() {
    console.log("Clicked");
    
    this.showEmojiPicker = !this.showEmojiPicker;
}

addEmoji(event: any) {
    this.userInput += event.emoji.native;
}


  selected:undefined | boolean =false;

  selectedTutor: Tutor;

  selectUser(tutor:Tutor) {
    console.log("This is tutor data",tutor);
    
    this.messages = []
    this.selected = true;
    this.tutorId = tutor._id
    this.joinChat();
    this.selectedTutor = tutor;
    this.getOldChats(this.tutorId);
  }
  joinChat(){
    this.chatService.joinChat(this.userId,this.userType);
  }

  getOldChats(tutorId:string){
    this.userChatservice.getOldChats(tutorId).subscribe({
      next: (response) => {
        console.log('fetched older messages: ', response.data);
      this.messages.push(...response.data);
      },
      error: (error) => {
        console.error('Error fetching older chat:', error);
      }
  });
  }

  sendMessage(){
    this.chatService.sendMessage(this.userId,this.tutorId,this.userType, this.userInput);
    this.messages.push({userId:this.userId, senderType:this.userType, message:this.userInput});
    this.userInput = '';
    this.showEmojiPicker = false;
  }

  getMessages(){
    this.chatService.getMessages().subscribe((message: ChatMessage)=>{
      console.log('hey, received message in the component:', message);
      
      this.messages.push(message);
      console.log(this.messages);
    })
  }
  makeCall(){}


}
