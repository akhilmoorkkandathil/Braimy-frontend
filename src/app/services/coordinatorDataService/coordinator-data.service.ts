import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinator } from '../../interfaces/coordinator';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorDataService {

  constructor() { }

  private userDataSubject = new BehaviorSubject<Coordinator | null>(null);
  coordinatorData$ = this.userDataSubject.asObservable();

  updateCoordinatorData(coordinator: Coordinator) {
    this.userDataSubject.next(coordinator); // Update the user data
  }
}
