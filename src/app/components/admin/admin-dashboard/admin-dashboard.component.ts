import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  constructor(private adminService: AdminServiceService){}
  ngOnInit(): void {
    this.fetchData()
  }
  studentCount:Number;
  tutorCount:Number;
  completedClasses:Number;
  
  fetchData(){
    this.adminService.getDashBoardData().subscribe({
      next: (response) => {
        console.log(response.data);
        this.studentCount = response.data.students;
        this.tutorCount = response.data.tutors;
        this.completedClasses = response.data.courseCompleted;
       
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    });
  }
}