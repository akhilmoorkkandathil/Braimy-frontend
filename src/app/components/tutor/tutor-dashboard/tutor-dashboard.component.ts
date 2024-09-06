import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrl: './tutor-dashboard.component.css'
})
export class TutorDashboardComponent implements OnInit {
  upcomingClasses: User[] = [];
  ngOnInit(): void {
    this.fetchUpcomingClasses()
  }

  constructor(
    private adminService: AdminServiceService) {}

  fetchUpcomingClasses(){
    this.adminService.getTutorUpcomingClasses().subscribe({
      next: (response) => {
        //console.log(response.data);
        
        this.upcomingClasses = response.data;
       
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

}
