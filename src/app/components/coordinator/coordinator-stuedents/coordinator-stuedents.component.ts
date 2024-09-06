import { ChangeDetectorRef, Component } from '@angular/core';
import { Column } from '../../../interfaces/table/table';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../interfaces/user';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';

@Component({
  selector: 'app-coordinator-stuedents',
  templateUrl: './coordinator-stuedents.component.html',
  styleUrl: './coordinator-stuedents.component.css'
})
export class CoordinatorStuedentsComponent {
  tableColumns: Array<Column> = [
    { columnDef: 'position', header: 'Serial No.', cell: (element: Record<string, any>) => `${element['index']}` },
    { columnDef: 'name', header: 'Name', cell: (element: Record<string, any>) => `${element['username']}` },
    { columnDef: 'phone', header: 'Phone', cell: (element: Record<string, any>) => `${element['phone']}` },
    { columnDef: 'class', header: 'Class', cell: (element: Record<string, any>) => `${element['class']}` },
    { columnDef: 'tutor', header: 'Tutor', cell: (element: Record<string, any>) => `${element['tutor']?.username || 'N/A'}` },
    { columnDef: 'course', header: 'Course', cell: (element: Record<string, any>) => `${element['course']?.courseName || 'N/A'}` },
    { columnDef: 'preferredTime', header: 'Preferred Time', cell: (element: Record<string, any>) => `${element['preferredTime']}` },
    { columnDef: 'duration', header: 'Duration', cell: (element: Record<string, any>) => `${element['classDuration']}` },
    { columnDef: 'selectedDays', header: 'Selected Days', cell: (element: Record<string, any>) => `${element['selectedDays'].join(', ')}` }
];


dataSource = new MatTableDataSource<User>();
  tableData: Array<User> = [];

  constructor(
    private adminService: AdminServiceService, 
    private cdr: ChangeDetectorRef,
    private router:Router, 
    private toast: ToastService,
  ) {}


  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.adminService.getUsersList().subscribe({
      next: (response) => {
        this.tableData = response.data.map((item, index) => ({ ...item, index: index + 1 }));
        this.dataSource.data = this.tableData;
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (error) => {
        console.error('Error fetching users data:', error);
      }
    });
  }

  actions: string[] = ['edit','block','unblock'];

  onActionClicked(event: { action: string, element: any }): void {
    switch (event.action) {
      case 'edit':
        this.onEditClicked(event.element._id);
        break;
      case 'block':
        this.onBlockClicked(event.element._id);
        break;
      case 'unblock':
        this.onUnblockClicked(event.element._id);
        break;
      default:
        //console.log('Unknown action:', event.action);
    }
  }
  
  onEditClicked(id: string): void {
    this.router.navigate([`/coordinator/manageStudent/${id}`]);
  }
  
  
  onBlockClicked(id: string): void {
    if(confirm("Are you sure to delete ")){
      this.adminService.blockStudent(id).subscribe({
      next: (response) => {
        //console.log("Student blocked successfully", response);
        this.fetchUserData();
        this.toast.showSuccess(response.message, 'Success');
      },
      error: (error) => {
        console.error('Error blocking user:', error);
        this.toast.showSuccess(error.message, 'Error');
      }
    });
    }
    
  }
  
  onUnblockClicked(id: string): void {
    //console.log("Unblock clicked", id);
    this.adminService.unblockStudent(id).subscribe({
      next: (response) => {
        //console.log("Student unblocked successfully", response);
        this.fetchUserData();
        this.toast.showSuccess(response.message, 'Success');
      },
      error: (error) => {
        console.error('Error unblocking user:', error);
        this.toast.showError(error.message, 'Error');
      }
    });
  
  
  }
}
