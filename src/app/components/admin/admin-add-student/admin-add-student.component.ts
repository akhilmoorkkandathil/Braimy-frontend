import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordinator } from '../../../interfaces/coordinator';
import { Course } from '../../../interfaces/course';
import { Tutor } from '../../../interfaces/tutor';

@Component({
  selector: 'app-admin-add-student',
  templateUrl: './admin-add-student.component.html',
  styleUrl: './admin-add-student.component.css'
})
export class AdminAddStudentComponent {
  studentForm!: FormGroup;
  selectedFile: File | null = null;
  studentId: string | null = null;
  title:string='Enter Student Information';
  button:string='Add Student'
  coordinators:Array<Coordinator> = []; 
  tutors:Array<Tutor> = [];
  courses:Array<Course> = [];
  imagePreview!: string;
  formData: FormData = new FormData();

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
        this.tutors = response.data;
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
        console.error('Error fetching course data:', error);
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
    this.studentForm.patchValue({
      studentName: data.username,
      phone: data.phone,
      password: '***********', // Typically, you wouldn't populate password fields for security reasons
      studentClass: data.class, // Add actual data if you have this field
      email: data.email,
      tutor:data.tutor,
      coordinator:data.coordinator,
      course:data.course
    });
    this.imagePreview = data.photoUrl;
  }

  validateForm(){
    this.studentForm = this.fb.group({
      studentName: ['', Validators.required],
      studentClass: ['', Validators.required],
      phone: ['', Validators.required],
      password:['',Validators.required],
      email: ['', Validators.required],
      tutor: ['', Validators.required],
      coordinator: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {

      this.formData.append('studentName', this.studentForm.value.studentName);
      this.formData.append('studentClass', this.studentForm.value.studentClass);
      this.formData.append('phone', this.studentForm.value.phone);
      this.formData.append('password', this.studentForm.value.password);
      this.formData.append('email', this.studentForm.value.email);
      this.formData.append('tutor', this.studentForm.value.tutor);
      this.formData.append('coordinator', this.studentForm.value.coordinator);
      this.formData.append('course', this.studentForm.value.course);

      if (this.selectedFile) {
        this.formData.append('image', this.selectedFile, this.selectedFile.name);
      }
      if (this.studentId) {
        this.adminService.updateStudent(this.studentId, this.formData).subscribe({
          next: (response) => {
            //console.log('Student updated successfully', response);
            this.toast.showSuccess(response.message, 'Success');
            this.router.navigate(['/admin/students']);
          },
          error: (error) => {
            console.error('Error updating student:', error);
          }
        });
      }else{      
      this.adminService.addStudent(this.formData).subscribe({
        next: (response) => {
          //console.log('Student added successfully', response);
          this.toast.showSuccess(response.message, 'Success');
          this.router.navigate(['/admin/students']);
        },
        error: (error) => {
          console.error(error.response, error);
          this.toast.showError(error.response, 'Error');
        }
      });
    }
  }
}

onImagePick(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files ? fileInput.files[0] : null;

  if (file) {
    this.selectedFile = file;
    this.studentForm.patchValue({ image: file });
    this.studentForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
}
}
