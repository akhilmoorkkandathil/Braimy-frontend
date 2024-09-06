import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../../interfaces/apiResponse';
import { apiUrls } from '../../../API';

@Injectable({
  providedIn: 'root'
})
export class TutorChatService {
  http = inject(HttpClient);
  
  constructor() { }

  getOldChats(userId:string){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getOldChat/${userId}`);
  }
}
