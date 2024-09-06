import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chatServices/chatService/chat.service';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { User } from '../../../interfaces/user';
import { ChatMessage } from '../../../interfaces/chatMessage';
import { TutorChatService } from '../../../services/chatServices/tutorChatService/tutor-chat.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tutor-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './tutor-chat.component.html',
  styleUrl: './tutor-chat.component.css'
})
export class TutorChatComponent {

  tutorInput=''
  userId = '';
  studentList:User[];
  tutorId=''
  userType = "Tutor";
  messages: ChatMessage[] = [];
  lastMessages: Map<string, string> = new Map();

  constructor(
    private chatService:ChatService, 
    private studentService:AdminServiceService,
    private tutorChatService:TutorChatService
  ){}


  ngOnInit(): void {
      this.chatService.connect()
      this.tutorId = localStorage.getItem('tutorId');
      this.getMessages()
      this.fetchStudents();
      console.log(this.lastMessages);
      
  }


  fetchStudents() {
    this.studentService.getTutorStudentList().subscribe(res => {
      this.studentList = res.data;
      // Ensure lastMessages is applied correctly to studentList
      this.studentList.forEach(student => {
        student.lastMessage = this.lastMessages.get(student.userId) || 'No messages yet';
      });
      console.log("StudentList: ", this.studentList);
    });
  }
  

  selected:undefined | boolean =false;

  selectedStudent: User;

  selectUser(student) {
    console.log("selected student data",student);
    
    this.messages = []
    this.selected = true;
    this.userId = student._id
    this.joinChat()
    this.selectedStudent = student;
    this.getOldChats(this.userId);
  }

  joinChat(){
    this.chatService.joinChat(this.tutorId,this.userType);
  }
  getOldChats(userId:string){
    this.tutorChatService.getOldChats(userId).subscribe({
      next: (response) => {
        console.log('fetched older messages: ', response.data);
        this.messages = [...response.data];
        console.log("messages",this.messages);
        
      },
      error: (error) => {
        console.error('Error fetching older chat:', error);
      }
  });
}
  sendMessage(){
    console.log("I am tutorsend message in the tutor component");
    console.log("usrId: ",this.userId,"tutorId: ",this.tutorId,"USer type",this.userType, this.tutorInput);
    
    this.chatService.sendMessage(this.userId,this.tutorId,this.userType, this.tutorInput);
    this.messages.push({userId:this.userId, senderType:this.userType, message:this.tutorInput});
    this.tutorInput = '';
  }
  getMessages() {
    this.chatService.getMessages().subscribe((message: ChatMessage) => {
      console.log('Received message:', message);
      this.messages.push(message);
      // Update the last message for the user or tutor
      if (message.senderType === 'Tutor') {
        this.lastMessages.set(message.userId, message.message);
      } else {
        this.lastMessages.set(message.userId, message.message);
      }
      console.log("Last Messages: ", this.lastMessages);
      // Update student list to reflect the last message
      this.fetchStudents();
    });
  }
  
}
