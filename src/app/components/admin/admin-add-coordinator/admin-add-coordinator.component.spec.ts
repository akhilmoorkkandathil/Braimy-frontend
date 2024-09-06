import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCoordinatorComponent } from './admin-add-coordinator.component';

describe('AdminAddCoordinatorComponent', () => {
  let component: AdminAddCoordinatorComponent;
  let fixture: ComponentFixture<AdminAddCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddCoordinatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
