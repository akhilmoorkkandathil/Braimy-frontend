import { Component, OnInit, } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserServiceService } from '../../../services/userServices/user-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  upcomingClasses: User[] = [];
  name:string="user";
  count = 0
  ngOnInit(): void {
    this.todaysClasses()
  }

  constructor(
    private userService: UserServiceService  ) {}

    handleRecharge(){
      
    }

    todaysClasses(){
    this.userService.getStudentClasses().subscribe({
      next: (response) => {
        this.upcomingClasses = response.data;
       
      },
      error: (error) => {
        console.error('Error fetching todays class data:', error);
      }
    });
  }

}
