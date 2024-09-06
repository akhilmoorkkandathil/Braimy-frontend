import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordinator } from '../../../interfaces/coordinator';
import { Tutor } from '../../../interfaces/tutor';
import { Course } from '../../../interfaces/course';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.css'
})
export class ManageStudentComponent {
  manageForm!: FormGroup;
  selectedFile: File | null = null;
  studentId: string | null = null;
  title:string='Enter Student Information';
  button:string='Add Student'
  coordinators:Array<Coordinator> = []; 
  tutors:Array<Tutor> = [];
  courses:Array<Course> = [];
  durations: string[] = ['1hr', '2hr', '3hr'];
  dayList: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  defaultValue = { hour: 13, minute: 30 };

  timeChangeHandler(event: any) {}

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServiceService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router
  ) {}
  ngOnInit() {
    this.validateForm();
    this.fetchCoordinatorData();
    this.fetchTutorData()
    this.fetchCourseData()    
    this.route.paramMap.subscribe(params => {      
      this.studentId = params.get('id');      
      if (this.studentId) {
        this.loadStudentData(this.studentId);
      }
    });
  }
  loadStudentData(id: string): void {
    this.adminService.getStudent(id).subscribe({
      next: (response) => {
        this.title = "Edit Student Information";
        this.button = "Update student";
        this.populateForm(response.data);
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      }
    });
  }
  fetchTutorData(): void {
    this.adminService.getTutorsList().subscribe({
      next: (response) => {
        //console.log("Fetched tutor data suscesfull",response);
        
        this.tutors = response.data;
        //console.log(this.tutors);
        
      },
      error: (error) => {
        console.error('Error fetching tutor data:', error);
      }
    });
  }
  fetchCourseData(): void {
    this.adminService.getCouresList().subscribe({
      next: (response) => {
        //console.log("course data",response);
        
        this.courses = response.data;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  fetchCoordinatorData(): void {
    this.adminService.getCoordinatorsList().subscribe({
      next: (response) => {
        this.coordinators = response.data;
        
      },
      error: (error) => {
        console.error('Error fetching coordinator data:', error);
      }
    });
  }
  populateForm(data: any): void {
    this.manageForm.patchValue({
      studentName: data.username,
      phone: data.phone,
      studentClass: data.class,
      email: data.email,
      preferredTime:data.preferredTime,
      selectedDays:data.selectedDays,
      course:data.course,
      tutor:data.tutor
    });
  }

  validateForm(){
    this.manageForm = this.fb.group({
      studentName: ['', Validators.required],
      studentClass: ['', Validators.required],
      phone: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      tutor: ['', Validators.required],
      course: ['', Validators.required],
      preferredTime: ['', Validators.required],
      selectedDays: [[], Validators.required],
      duration: ['', Validators.required]
    });
  }

  onSubmit() {    
    if (this.manageForm.valid) {
      //console.log(this.manageForm.value);
      this.manageForm.get('phone')?.enable();
      this.manageForm.get('email')?.enable();
      
      this.adminService.addManagement(this.manageForm.value).subscribe({
        next: (response) => {
          //console.log('Student manage did added successfully', response);
          this.toast.showSuccess(response.message, 'Success');
          this.router.navigate(['/coordinator/students']);
        },
        error: (error) => {
          console.error(error.response, error);
          this.toast.showError(error.response, 'Error');
        }
      });
  }
}
}
