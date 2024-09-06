import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';

@Component({
  selector: 'app-coordinator-sidebar',
  templateUrl: './coordinator-sidebar.component.html',
  styleUrl: './coordinator-sidebar.component.css'
})
export class CoordinatorSidebarComponent {
  name="coordinator"

  constructor( private router: Router,private toast:ToastService){}


  logout() {
    sessionStorage.removeItem('COORDINATOR');
    this.router.navigate(['/login']);  // Adjust the route as per your application's routing structure
    this.toast.showSuccess('Logged out successfully', 'Success');
  }
}
