import { ChangeDetectorRef, Component } from '@angular/core';
import { Column } from '../../../interfaces/table/table';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../../../interfaces/expense';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { Payment } from '../../../interfaces/payment';
import { ToastService } from '../../../services/toastService/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-payment-list',
  templateUrl: './admin-payment-list.component.html',
  styleUrl: './admin-payment-list.component.css'
})
export class AdminPaymentListComponent {
  tableColumns: Array<Column> = [
    { columnDef: 'position', header: 'Serial No.', cell: (element: Record<string, any>) => `${element['index']}` },
    { columnDef: 'date', header: 'Date', cell: (element: Record<string, any>) => `${element['date']}` },
    { columnDef: 'studentName', header: 'Student Name', cell: (element: Record<string, any>) => `${element['studentName']}` },
    { columnDef: 'courseSelected', header: 'Course Selected', cell: (element: Record<string, any>) => `${element['courseSelected']}` },
    { columnDef: 'phone', header: 'Phone', cell: (element: Record<string, any>) => `${element['phone']}` },
    { columnDef: 'description', header: 'Description', cell: (element: Record<string, any>) => `${element['description']}` },
    { columnDef: 'amount', header: 'Amount', cell: (element: Record<string, any>) => `${element['amountPaid']}` },
    
  ];
  dataSource = new MatTableDataSource<Payment>();
  tableData: Array<Payment> = [];

  constructor(
    private adminService: AdminServiceService,
    private cdr: ChangeDetectorRef,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPaymentData();
  }

  fetchPaymentData(): void {
    this.adminService.getPaymentList().subscribe({
      next: (response) => {
        this.tableData = response.data.map((item, index) => ({ ...item, index: index + 1 }));
        this.dataSource.data = this.tableData;
        this.cdr.detectChanges(); // Trigger change detection
        //console.log(this.tableData);
      },
      error: (error) => {
        console.error('Error fetching payment data:', error);
      }
    });
  }
  actions: string[] = ['edit','delete']; // Define actions separately

onActionClicked(event: { action: string, element: any }): void {
  switch (event.action) {
    case 'edit':
      this.onEditClicked(event.element._id);
      break;
    case 'delete':
      this.onDeleteClicked(event.element._id);
      break;
    default:
      //console.log('Unknown action:', event.action);
  }
}

onEditClicked(id:string): void {
  this.router.navigate([`/admin/addPayment/${id}`]);
}


onDeleteClicked(id:string): void {
  this.adminService.deletePayment(id).subscribe({
    next: (response) => {
      this.fetchPaymentData();
      this.toast.showSuccess(response.message, 'Success');
    },
    error: (error) => {
      console.error('Error deleting tutor:', error);
      this.toast.showError(error.message, 'Error');
    }
  });
}

}
