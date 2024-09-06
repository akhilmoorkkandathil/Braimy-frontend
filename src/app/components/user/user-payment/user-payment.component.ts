import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PaymentService } from '../../../services/paymentServices/payment.service';
import { RazorpayOrder } from '../../../interfaces/razorpay';
import { RazorpayOptions } from '../../../interfaces/razorpayOptions';
import { environment } from '../../../../environments/environment';
import { planSubscription } from '../../../interfaces/subscription';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastService } from '../../../services/toastService/toast.service';
import { WindowRefService } from '../../../services/windowRefService/window-ref.service';

@Component({
  selector: 'app-user-payment',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-payment.component.html',
  styleUrl: './user-payment.component.css',
})
export class UserPaymentComponent {
  razorpayOrder!: RazorpayOrder;
  razorpayResponseSubscription!: Subscription;

  constructor(
    private paymentService: PaymentService,
    private toast: ToastService,
    private windRef: WindowRefService
  ) {}

  basic(type: string, amount: number) {
    console.log('Clicked');

    this.paymentService.payment({ type, amount }).subscribe({
      next: (response) => {
        this.razorpayOrder = response.data;
        console.log(response.data);
        this.payWithRazor();
      },
      error: (error) => {
        console.error('Error fetching todays class data:', error);
      },
    });
  }

  payWithRazor() {
    const options: RazorpayOptions = {
      key: environment.RZP_KEY_ID,
      amount: 1000 * 100,
      currency: 'INR',
      name: 'Braimy',
      description: 'Braimy payment for Subscription.',
      image: 'https://res.cloudinary.com/db7wl83jl/image/upload/v1724297785/newbig-removebg_jh0fte.png',
      order_id: this.razorpayOrder.orderId,
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#007bff',
      },
    };
    console.log('okay', options);

    options.handler = (response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
      if (response) {
        this.razorpayResponseSubscription = this.paymentService
          .processPayment(response, this.razorpayOrder)
          .subscribe({
            next: (res) => {
              Swal.fire({
                title: "Success!",
                text: "Paymenet Successfull!!",
                icon: "success"
              });
            },
            error: (err) => {
              Swal.fire({
                title: 'Error!',
                text: 'Failed to process payment.',
                icon: 'error',
              });
              console.log(err);
              //this.toastr.error('Failed to process payment.');
            },
          });
      }
      if(error){
        console.log(error);
        
      }
    };

    if (options.modal) {
      options.modal.ondismiss = () => {
        // handle the case when user closes the form while transaction is in progress
        Swal.fire({
          title: 'Error!',
          text: 'Your payment cancelled.',
          icon: 'error',
        });
        console.log('Transaction cancelled.');
      };
    }

    const rzp = new this.windRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
