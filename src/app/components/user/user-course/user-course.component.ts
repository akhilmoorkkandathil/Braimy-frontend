import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../services/userServices/user-service.service';
import { Course } from '../../../interfaces/course';


@Component({
  selector: 'app-user-course',
  standalone: true,
  imports: [],
  templateUrl: './user-course.component.html',
  styleUrl: './user-course.component.css'
})
export class UserCourseComponent {
  course: Course; // Define the type according to your data

  constructor(private route: ActivatedRoute, private userService: UserServiceService) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id'); // Retrieve course ID from route
    if (courseId) {
      this.fetchCourseDetails(courseId);
    }
  }

  fetchCourseDetails(courseId: string): void {
    this.userService.getCourse(courseId).subscribe({
      next: (response) => {
        console.log(response);
        
        this.course = response.data[0]; // Ensure response contains course details

      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      }
    });
  }
}
