import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoginService } from '../../../services/userLogin/user-login.service';
import { FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastService } from '../../../services/toastService/toast.service';
import { UserSignupService } from '../../../services/userSignup/user-signup.service';
import { SwPush } from '@angular/service-worker';
import { apiUrls } from '../../../API';
import { User } from '../../../interfaces/user';
import { EncryptionService } from '../../../services/chatServices/encryptionService/encryption.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{

  
  fb = inject(FormBuilder);
  router = inject(Router);
  userLoginService = inject(UserLoginService)


  error: string|null ='';
  studentLoginForm!: FormGroup;
  tutorLoginForm!: FormGroup;
  coordinatorLoginForm!: FormGroup;
  adminLoginForm!: FormGroup;
  message:string='';

  user!: SocialUser;
  loggedIn: boolean = false;
  readonly VAPID_PUBLIC_KEY = 'BD_qZ0tyVaPC6DVg2kKmWTqw9C4NOMyHiZYyLJIwDmoKvhdF0ieqIw9vaffOnfJCoI2fWAyBk1Pib8KWsp5Lsd8';
  private subscriptions: Subscription[] = [];

  constructor(
    private loginService: UserLoginService,
    private socialAuthService: SocialAuthService,
    private toast: ToastService,
    private signupService:UserSignupService,
    private swPush:SwPush,
    private encryptionService: EncryptionService
  ){}

  ngOnInit(): void {
    this.validateStudentForm();
    this.validateTutorForm();
    this.validateCoordinatorForm();
    this.validateAdminForm();
    this.checkLoginStatus();
    this.setupGoogleAuthListener();
  }
  checkLoginStatus() {
    const userSession = sessionStorage.getItem('STUDENT');
    const socialSession = sessionStorage.getItem('SOCIAL')
    if (userSession && socialSession) {
      this.loggedIn = true;
      if (this.router.url === '/login') {
        this.router.navigate(['/user/dashboard']);
      }
    }
  }

  setupGoogleAuthListener() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.handleSuccessfulLogin(user, true);
      }
    });
  }

  handleSuccessfulLogin(user: SocialUser, isGoogleLogin: boolean) {
    this.loggedIn = true;
    sessionStorage.setItem("SOCIAL","true");
    sessionStorage.setItem('STUDENT', 'student');
    this.toast.showSuccess("Login Successful", 'Success');

    if (isGoogleLogin) {
      this.storeUserData(user);
    }

    if (this.router.url !== '/user/dashboard') {
      this.router.navigate(['/user/dashboard']);
    }
  }

  storeUserData(user: SocialUser) {
    this.signupService.storeUserData(user).subscribe(
      (response) => {
        console.log('User data stored successfully', response);
        this.user = response.data;
      },
      (error) => {
        console.error('Error storing user data', error);
      }
    );
  }

  

  pushSubscription(token) {
    if (!this.swPush.isEnabled) {
      //console.log("Service Worker Push is not enabled");
      return;
    }    
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
      
    }).then(sub => {      
      //console.log("Subscription", sub);
      this.sendSubscriptionToServer(sub,token);
    }).catch(err => {
      console.error("Subscription error", err);
    
    });
  }

  sendSubscriptionToServer(subscription: PushSubscription,token:String) {
    // URL of your backend endpoint
    const endpoint = `${apiUrls.usersApi}subscribe`;
    const payload = {
      subscription: subscription,
      token: token
  };
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        //console.log('Subscription data sent successfully:',data);
    })
    .catch(error => {
        console.error('Error sending subscription data:', error);
    });
}


  validateStudentForm(){
    this.studentLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    const studentFormSubscription = this.studentLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }
  validateTutorForm(){
    this.tutorLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    const tutorFormSubscription = this.tutorLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
    this.subscriptions.push(tutorFormSubscription)
  }
  validateCoordinatorForm(){
    this.coordinatorLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    const coordinatorFormSubscription = this.coordinatorLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
    this.subscriptions.push(coordinatorFormSubscription)

  }
  validateAdminForm(){
    this.adminLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    const adminFormSubscription = this.adminLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
    this.subscriptions.push(adminFormSubscription)

  }


  onStudentLogin() {
    const loginSubscription = this.loginService.userLogin(this.studentLoginForm.value)
      .subscribe({
        next: (res) => {
          console.log("In student login component",res.data);
         //const encryptedUserId = this.encryptionService.encrypt(res.data._id);
          localStorage.setItem("userId", res.data.userId);
          sessionStorage.setItem('STUDENT', "student");
          sessionStorage.setItem('auth_token', res.token);
          this.toast.showSuccess(res.message, 'Success');
            this.router.navigate(['/user/dashboard']);
            this.pushSubscription(res.token);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
      this.subscriptions.push(loginSubscription)
  }

  onTutorLogin() {
    if (this.tutorLoginForm.valid) {
      const loginSubscription = this.loginService.tutorLogin(this.tutorLoginForm.value)
      .subscribe({
        next: (res) => {
          //console.log(res.token); tutorId
          localStorage.setItem("tutorId", res.data.tutorId);
          localStorage.setItem("tutorId", res.data.tutorId);
          sessionStorage.setItem('TUTOR', "tutor");
          sessionStorage.setItem('auth_token', res.token);
          this.toast.showSuccess(res.message, 'Success');
            this.router.navigate(['/tutor/dashboard']);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
      this.subscriptions.push(loginSubscription);
    }
  }

  onCoordinatorLogin() {
    if (this.coordinatorLoginForm.valid) {
      // Handle coordinator login
      const loginSubscription = this.loginService.coordinatorLogin(this.coordinatorLoginForm.value)
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('COORDINATOR', "coordinator");
          this.toast.showSuccess(res.message, 'Success');
          sessionStorage.setItem('auth_token', res.token);
            this.router.navigate(['/coordinator/dashboard']);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
      this.subscriptions.push(loginSubscription)
    }
  }

  onAdminLogin() {
    if (this.adminLoginForm.valid){
      // Handle admin login
      const loginSubscription = this.loginService.adminLogin(this.adminLoginForm.value)
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('ADMIN', "admin");
          this.toast.showSuccess(res.message, 'Success');
          sessionStorage.setItem('auth_token', res.token);
            this.router.navigate(['/admin/dashboard']);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
      this.subscriptions.push(loginSubscription)
    }
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  } 
}


