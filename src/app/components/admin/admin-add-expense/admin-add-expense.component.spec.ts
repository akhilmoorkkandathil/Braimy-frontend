import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddExpenseComponent } from './admin-add-expense.component';

describe('AdminAddExpenseComponent', () => {
  let component: AdminAddExpenseComponent;
  let fixture: ComponentFixture<AdminAddExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddExpenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
