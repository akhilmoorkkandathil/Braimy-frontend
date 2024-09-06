import { ChangeDetectorRef, Component } from '@angular/core';
import { Column } from '../../../interfaces/table/table';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../interfaces/user';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';

@Component({
  selector: 'app-coordinator-classes',
  templateUrl: './coordinator-classes.component.html',
  styleUrl: './coordinator-classes.component.css'
})
export class CoordinatorClassesComponent {
  tableColumns: Array<Column> = [
    { columnDef: 'position', header: 'Serial No.', cell: (element: Record<string, any>) => `${element['index']}` },
    { columnDef: 'name', header: 'Name', cell: (element: Record<string, any>) => `${element['username']}` },
    { columnDef: 'phone', header: 'Phone', cell: (element: Record<string, any>) => `${element['phone']}` },
    { columnDef: 'class', header: 'Class', cell: (element: Record<string, any>) => `${element['class']}` },
    { columnDef: 'tutor', header: 'Tutor', cell: (element: Record<string, any>) => `${element['tutor']?.username || 'N/A'}` },
    { columnDef: 'course', header: 'Course', cell: (element: Record<string, any>) => `${element['course']?.courseName || 'N/A'}` },
    { columnDef: 'preferredTime', header: 'Preferred Time', cell: (element: Record<string, any>) => `${element['preferredTime']}` },
    { columnDef: 'selectedDays', header: 'Selected Days', cell: (element: Record<string, any>) => `${element['selectedDays'].join(', ')}` },
    { columnDef: 'status', header: 'Class Status', cell: (element: Record<string, any>) => `${element['classStatus']}` },
    { columnDef: 'approval', header: 'Approval Status', cell: (element: Record<string, any>) => `${element['approvalStatus']}` },
    
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
    this.adminService.getTodaysClasses().subscribe({
      next: (response) => {
        this.tableData = response.data.map((item, index) => ({ ...item, index: index + 1 }));
        this.dataSource.data = this.tableData;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

actions: string[] = ['approve','notification'];

onActionClicked(event: { action: string, element: any }): void {
  switch (event.action) {
    case 'approve':
      this.onApproveClicked(event.element._id);
      break;
      case 'notification':
        this.onNotificationClicked(event.element._id);
        break;
    default:
      //console.log('Unknown action:', event.action);
  }
}
  
  
  
onApproveClicked(id: string): void {
  this.adminService.approveClass(id).subscribe({
    next: (response) => {
      //console.log("Student blocked successfully", response);
      this.fetchUserData();
      this.toast.showSuccess(response.message, 'Success');
    },
    error: (error) => {
      this.toast.showError(error.message, 'Error');
    }
  });
}

onNotificationClicked(id: string): void {
  //console.log("Cliked to send notification");
  
  this.adminService.sendNotification(id).subscribe({
    next: (response) => {
      //console.log("Student blocked successfully", response);
    },
    error: (error) => {
      this.toast.showError(error.message, 'Error');
    }
  });
}
  
}
