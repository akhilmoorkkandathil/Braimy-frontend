import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';

@Injectable({
  providedIn: 'root'
})
export class otpVerifyService {
  http = inject(HttpClient)

  constructor() { }

  setOtp(userId:string){   
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}set_otp/${userId}`, {userId: userId});
  }


  verifyOTP(userId:string, otp: string){
    const url = `${apiUrls.usersApi}verify_user?userId=${userId}`;
    const body = { otp: otp };
    return this.http.patch<any>(url, body, {withCredentials: true});
    
  }

  resendOTP(userId: string)
  {
    return this.http.patch<ApiResponse>(`${apiUrls.usersApi}resend_otp`, {userId: userId}, {withCredentials: true});
  }


}
