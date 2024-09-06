import { ChangeDetectorRef, Component } from '@angular/core';
import { Column } from '../../../interfaces/table/table';
import { User } from '../../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';

@Component({
  selector: 'app-tutor-classes',
  templateUrl: './tutor-classes.component.html',
  styleUrl: './tutor-classes.component.css'
})
export class TutorClassesComponent {
  tableColumns: Array<Column> = [
    { columnDef: 'position', header: 'Serial No.', cell: (element: Record<string, any>) => `${element['index']}` },
    { columnDef: 'name', header: 'Name', cell: (element: Record<string, any>) => `${element['username']}` },
    { columnDef: 'phone', header: 'Phone', cell: (element: Record<string, any>) => `${element['phone']}` },
    { columnDef: 'status', header: 'Class Status', cell: (element: Record<string, any>) => `${element['classStatus']}` },
    { columnDef: 'approval', header: 'Approval Status', cell: (element: Record<string, any>) => `${element['approvalStatus']}` },
    { columnDef: 'class', header: 'Class', cell: (element: Record<string, any>) => `${element['class']}` },
    { columnDef: 'tutor', header: 'Tutor', cell: (element: Record<string, any>) => `${element['tutor']?.username || 'N/A'}` },
    { columnDef: 'course', header: 'Course', cell: (element: Record<string, any>) => `${element['course']?.courseName || 'N/A'}` },
    { columnDef: 'preferredTime', header: 'Preferred Time', cell: (element: Record<string, any>) => `${element['preferredTime']}` },
    { columnDef: 'selectedDays', header: 'Selected Days', cell: (element: Record<string, any>) => `${element['selectedDays'].join(', ')}` },
    
];
dataSource = new MatTableDataSource<User>();
  tableData: Array<User> = [];

  constructor(
    private adminService: AdminServiceService, 
    private cdr: ChangeDetectorRef,
    private router:Router, 
    private toast: ToastService,
  ) { }


  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.adminService.getTutorStudentList().subscribe({
      next: (response) => {
        this.tableData =response.data.map((item, index) => ({ ...item, index: index + 1 }));
        this.dataSource.data = this.tableData;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  actions: string[] = ['completed'];

  

  onActionClicked(event: any) {
    switch (event.action) {
      case 'completed':
        this.onCompleteClicked(event.element._id);
        break;
      default:
        //console.log('Unknown action:', event.action);
    }
  }

  onCompleteClicked(id:string): void {
    this.adminService.markCompleted(id).subscribe({
      next: (response) => {
        this.fetchUserData();
        this.toast.showSuccess(response.message, 'Success');
      },
      error: (error) => {
        console.error('Error deleting tutor:', error);
        this.toast.showError(error.message, 'Error');
      }
    });
  }
}
