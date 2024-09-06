import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTutorComponent } from './admin-add-tutor.component';

describe('AdminAddTutorComponent', () => {
  let component: AdminAddTutorComponent;
  let fixture: ComponentFixture<AdminAddTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
