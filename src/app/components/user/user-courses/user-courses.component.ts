import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserServiceService } from '../../../services/userServices/user-service.service';
import { Course } from '../../../interfaces/course';
import { CommonModule } from '@angular/common'
import { 
	IgxButtonModule,
	IgxIconModule,
	IgxCardModule,
	IgxRippleModule
 } from "igniteui-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,CommonModule,IgxButtonModule,IgxIconModule,IgxCardModule,IgxRippleModule],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit {

  courses: Course[] = []; // Array to store the fetched courses

  constructor(private userService: UserServiceService, private router:Router) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.userService.getCouresList().subscribe({
      next: (response) => {
        this.courses = response.data; // Assuming response is an array of courses
        console.log(this.courses);
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }
  navigateToCourse(courseId:string):void{
    this.router.navigate(['/user/course-showcase', courseId]); 
  }
}


