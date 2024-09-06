import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserDataService } from '../../../services/userDataService/user-data.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  userData:User;
  greeting: string;
  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.setGreeting();
    this.userDataService.userData$.subscribe(data => {
      this.userData = data;
    });
  }

  setGreeting() {
    const currentHour = new Date().getHours();
    console.log(currentHour);
    

    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 15) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }
}
