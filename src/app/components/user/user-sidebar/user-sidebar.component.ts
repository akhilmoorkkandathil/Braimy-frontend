import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { User } from '../../../interfaces/user';
import { UserServiceService } from '../../../services/userServices/user-service.service';
import { UserDataService } from '../../../services/userDataService/user-data.service';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  userData: User = { username: '', photoUrl: '' };
  username:string='';
  constructor( 
    private router: Router,
    private toast:ToastService,
    private socialAuthService: SocialAuthService, 
    private userService :UserServiceService,
    private userDataService: UserDataService
  ){}
  ngOnInit() {
    this.getStudentData();
    
  }

  updateUser(user: User) {
    this.userDataService.updateUserData(user); // Share the updated user data
  }
  getStudentData(){
    this.userService.getStudentData().subscribe({
      next:(response)=>{
        console.log("This is response.data in the student sidebar",response.data);
        
        this.userData = response.data[0];
        //this.updateUser(response.data[0])
        this.username = response.data[0].username;
        console.log(this.userData);
      },
      error:(error)=>{
        console.error('Error fetching student data:', error);
      }
    })
  }

  logout() {
    // Check if 'SOCIAL' exists in session storage
    const check = sessionStorage.getItem("SOCIAL");
    
    if (check) {
      // Perform social logout if SOCIAL is in session storage
      this.socialAuthService.signOut().then(() => {
        // Remove SOCIAL item from session storage
        sessionStorage.removeItem('SOCIAL');
        // Notify the user
        this.toast.showSuccess("Logout Successful", 'Success');
        // Redirect to login page
        this.router.navigate(['/login']);
      }).catch(error => {
        // Handle errors from social sign out if necessary
        console.error('Error during social logout:', error);
        this.toast.showError("Logout failed. Please try again.", 'Error');
      });
    } else {
      // Handle regular logout (if needed)
      sessionStorage.removeItem('STUDENT');
      this.toast.showSuccess("Logout Successful", 'Success');
      this.router.navigate(['/login']);
    }
  }
}
