import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';
import { TutorService } from '../../../services/tutorService/tutor.service';
import { Tutor } from '../../../interfaces/tutor';
import { UserDataService } from '../../../services/userDataService/user-data.service';

@Component({
  selector: 'app-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrl: './tutor-sidebar.component.css'
})
export class TutorSidebarComponent implements OnInit {
  tutorName=""
  tutorData: Tutor = { username: '', photoUrl: '' };

  constructor( 
    private router: Router,
    private toast:ToastService,
    private tutorService: TutorService,
    private stateService:UserDataService
  ){}

  ngOnInit(): void {
      this.getTutorData()
  }
getTutorData(){
  this.tutorService.getTutorData().subscribe({
    next:(response)=>{
      console.log("This is response.data in the tutor sidebar",response.data);
      
      this.tutorData = response.data[0];
      //this.updateTutor(response.data[0])
      this.tutorName = response.data[0].username;
      console.log(this.tutorData);
    },
    error:(error)=>{
      console.error('Error fetching tutor data:', error);
    }
  })
}

updateTutor(tutor: Tutor) {
  this.stateService.updateUserData(tutor); // Share the updated user data
}
  logout() {
    sessionStorage.removeItem('TUTOR');
    this.router.navigate(['/login']);  // Adjust the route as per your application's routing structure
    this.toast.showSuccess('Logged out successfully', 'Success');
  }
  
}
