import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  http = inject(HttpClient)
  router = inject(Router)

 
  userLogin(loginObj:User){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}login`,loginObj,{withCredentials:true})
  }

  tutorLogin(loginObj:User){
    return this.http.post<ApiResponse>(`${apiUrls.tutorsApi}login`,loginObj,{withCredentials:true})
  }
  coordinatorLogin(loginObj:User){
    return this.http.post<ApiResponse>(`${apiUrls.coordinatorApi}login`,loginObj,{withCredentials:true})
  }

  adminLogin(loginObj:User){
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}login`,loginObj,{withCredentials:true})
  }

  saveUserData(userData:any){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}saveUser`, userData);
  }

  isStudentBlocked(): Observable<boolean> {
    return this.http.get<{ blocked: boolean }>(`${apiUrls.usersApi}blockStatus`, { withCredentials: true }).pipe(
      map(response => response.blocked)
    );
  }

  studentLogout(): void {
    sessionStorage.removeItem('STUDENT');
    this.router.navigate(['/login']);
    // Add additional logout logic if needed (e.g., clearing tokens, notifying server)
  }

  isStudentLoggedIn()
  {
    let user = sessionStorage.getItem('STUDENT');
    return user === "student"
  }
  
  isTutorLoggedIn()
  {
    let user = sessionStorage.getItem('TUTOR');
    return user === "tutor"
  }
  isTutorBlocked(): Observable<boolean> {
    return this.http.get<{ blocked: boolean }>(`${apiUrls.tutorsApi}blockStatus`, { withCredentials: true }).pipe(
      map(response => response.blocked)
    );
  }
  
  tutorLogout(): void {
    sessionStorage.removeItem('TUTOR');
    // Additional logout logic if needed
  }
  
  isAdminLoggedIn():boolean
  {
    let user = sessionStorage.getItem('ADMIN');
    return user === "admin"
  }
  isCoordinatorLoggedIn()
  {
    let user = sessionStorage.getItem('COORDINATOR');
    return user === "coordinator"
  }
  isCoordinatorBlocked(): Observable<boolean> {
    return this.http.get<{ blocked: boolean }>(`${apiUrls.coordinatorApi}blockStatus`, { withCredentials: true }).pipe(
      map(response => response.blocked)
    );
  }
  
  coordinatorLogout(): void {
    sessionStorage.removeItem('COORDINATOR');
    // Additional logout logic if needed
  }





  private currentUserSubject: BehaviorSubject<SocialUser | null>;
  public currentUser: Observable<SocialUser | null>;

  constructor(private socialAuthService: SocialAuthService) {
    this.currentUserSubject = new BehaviorSubject<SocialUser | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    this.socialAuthService.authState.subscribe((user) => {
      this.currentUserSubject.next(user);
    });
  }

  signInWithGoogle(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): Promise<void> {
    return this.socialAuthService.signOut();
  }

  get currentUserValue(): SocialUser | null {
    return this.currentUserSubject.value;
  }

  
}
