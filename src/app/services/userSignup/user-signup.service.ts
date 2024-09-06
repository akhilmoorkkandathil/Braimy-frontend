import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';

@Injectable({
  providedIn: 'root'
})

export class UserSignupService {
  http = inject(HttpClient)

  constructor() { }
  userSignup(signupObj:User){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}register_user`,signupObj,{withCredentials:true})
  }
  tutorSignup(signupObj:User){
    return this.http.post<ApiResponse>(`${apiUrls.tutorsApi}register_tutor`,signupObj,{withCredentials:true})
  }
  coordinatorSignup(signupObj:User){
    return this.http.post<ApiResponse>(`${apiUrls.coordinatorApi}register_coordinator`,signupObj,{withCredentials:true})
  }
  storeUserData(goodleData:any){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}saveUser`,goodleData,{withCredentials:true})
  }
  isStudentBlocked(email: string) {
    return this.http.post<{ blocked: boolean }>(`${apiUrls.usersApi}check-block-status`, { email });
  }
}
