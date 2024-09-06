import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';
import { RazorpayPaymentSuccessResponse } from '../../interfaces/razorpayOptions';
import { RazorpayOrder } from '../../interfaces/razorpay';
import { planSubscription } from '../../interfaces/subscription';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  http = inject(HttpClient)

  constructor() { }
  payment(data:planSubscription){
    console.log(data);
    
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}payment`,data);
  }
  processPayment(razorpayPayment: RazorpayPaymentSuccessResponse, razorpayOrder: RazorpayOrder) {
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}payment_success`, {razorpayPayment, razorpayOrder})
  }


}
