import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorsListComponent } from './admin-tutors-list.component';

describe('AdminTutorsListComponent', () => {
  let component: AdminTutorsListComponent;
  let fixture: ComponentFixture<AdminTutorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTutorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
