import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/user';
import { Tutor } from '../../interfaces/tutor';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  private userDataSubject = new BehaviorSubject<User | null>(null);
  userData$ = this.userDataSubject.asObservable();

  updateUserData(user: User) {
    this.userDataSubject.next(user); // Update the user data
  }
  private tutorDataSubject = new BehaviorSubject<Tutor | null>(null);
  tutorData$ = this.tutorDataSubject.asObservable();

  updatetutorData(tutor: Tutor) {
    this.tutorDataSubject.next(tutor); // Update the user data
  }
}
