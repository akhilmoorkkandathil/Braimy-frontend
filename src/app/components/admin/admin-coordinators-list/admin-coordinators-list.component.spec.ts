import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoordinatorsListComponent } from './admin-coordinators-list.component';

describe('AdminCoordinatorsListComponent', () => {
  let component: AdminCoordinatorsListComponent;
  let fixture: ComponentFixture<AdminCoordinatorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCoordinatorsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCoordinatorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
