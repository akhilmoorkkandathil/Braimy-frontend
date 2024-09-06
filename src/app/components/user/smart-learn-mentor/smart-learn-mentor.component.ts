import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  GoogleGenerativeAI, HarmBlockThreshold, HarmCategory 
} from '@google/generative-ai';
import {environment} from "../../../../environments/environment"

@Component({
  selector: 'app-smart-learn-mentor',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './smart-learn-mentor.component.html',
  styleUrl: './smart-learn-mentor.component.css'
})
export class SmartLearnMentorComponent {
  messages: { text: string, sender: 'student' | 'mentor' }[] = [];
  newMessage: string = '';
  private genAI: GoogleGenerativeAI;
  private model: any;
  @ViewChild('chatBox') private chatBox!: ElementRef;


  constructor() {
    // Initialize the Google Generative AI with your API key
    this.genAI = new GoogleGenerativeAI(environment.API_KEY);
  }

  async ngOnInit() {
    // Initialize the model
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro",...this.generationConfig });
  }
  private scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollToBottom = this.chatBox.nativeElement.scrollHeight;
    } catch (err) { }
  }

  private generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    top_k: 32,
    maxOutputTokens: 100, // limit output
  };

  async sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sender: 'student' });
      const studentMessage = this.newMessage;
      this.newMessage = '';

      try {
        const result = await this.model.generateContent([studentMessage,
          "Structure the answer properly with bold and proper lining"]);
        let response = await result.response;
        const mentorReply = response.text();
        this.messages.push({ text: mentorReply, sender: 'mentor' });
        this.scrollToBottom();
      } catch (error) {
        console.error('Error generating response:', error);
        this.messages.push({ text: 'Sorry, I encountered an error. Please try again.', sender: 'mentor' });
        this.scrollToBottom();
      }
    }
  }
}
