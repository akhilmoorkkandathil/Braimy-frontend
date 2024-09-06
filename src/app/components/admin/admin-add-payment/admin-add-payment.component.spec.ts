import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPaymentComponent } from './admin-add-payment.component';

describe('AdminAddPaymentComponent', () => {
  let component: AdminAddPaymentComponent;
  let fixture: ComponentFixture<AdminAddPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
