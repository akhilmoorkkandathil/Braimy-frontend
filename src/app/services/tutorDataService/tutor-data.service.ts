import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tutor } from '../../interfaces/tutor';

@Injectable({
  providedIn: 'root'
})
export class TutorDataService {

  constructor() { }
  private tutorDataSubject = new BehaviorSubject<Tutor | null>(null);
  tutorData$ = this.tutorDataSubject.asObservable();

  updatetutorData(tutor: Tutor) {
    this.tutorDataSubject.next(tutor); // Update the user data
  }
}
