import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExpenseListComponent } from './admin-expense-list.component';

describe('AdminExpenseListComponent', () => {
  let component: AdminExpenseListComponent;
  let fixture: ComponentFixture<AdminExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminExpenseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
