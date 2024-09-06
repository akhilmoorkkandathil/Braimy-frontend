import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-payment',
  templateUrl: './admin-add-payment.component.html',
  styleUrl: './admin-add-payment.component.css'
})
export class AdminAddPaymentComponent {
  paymentForm!: FormGroup;
  selectedFile: File | null = null;
  paymentId: string | null = null;
  title:string='Enter Payment Information';
  button:string='Add Payment'

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServiceService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router
  ) {}
  ngOnInit() {
    this.validateForm();
    this.route.paramMap.subscribe(params => {      
      this.paymentId = params.get('id');      
      if (this.paymentId) {
        this.loadPaymentData(this.paymentId);
      }
    });
  }
  validateForm(){
    this.paymentForm = this.fb.group({
      studentName: ['', Validators.required],
      courseSelected: ['', Validators.required],
      phone: ['', Validators.required],
      description: [''],
      amount: ['', Validators.required],
    });
  }

  loadPaymentData(id: string): void {
    this.adminService.getPayment(id).subscribe({
      next: (response) => {
        this.title = "Edit Payment Information";
        this.button = "Update Payment";
        this.populateForm(response.data);
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      }
    });
  }
  populateForm(data: any): void {
    this.paymentForm.patchValue({
      studentName: data.studentName,
      phone: data.phone,
      courseSelected: data.courseSelected, 
      description: data.description, 
      amount: data.amountPaid
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      if (this.paymentForm.valid) {
        if (this.paymentId) {
          //console.log(this.paymentForm.value,this.paymentId);
          
          this.adminService.updatePayment(this.paymentId, this.paymentForm.value).subscribe({
            next: (response) => {
              this.toast.showSuccess(response.message, 'Success');
              this.router.navigate(['/admin/payments']);
            },
            error: (error) => {
              console.error('Error updating payment:', error);
            }
          });
        }else{      
          this.adminService.addPayment(this.paymentForm.value).subscribe({
            next: (response) => {
              this.toast.showSuccess(response.message, 'Success');
              this.router.navigate(['/admin/payments']);
            },
            error: (error) => {
              this.toast.showError(error.message, 'Error');
            }
          });
    }
    }
  }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    // Handle file upload logic
  }
}
