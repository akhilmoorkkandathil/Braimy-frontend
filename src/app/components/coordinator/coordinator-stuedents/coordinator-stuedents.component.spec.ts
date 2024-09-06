import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorStuedentsComponent } from './coordinator-stuedents.component';

describe('CoordinatorStuedentsComponent', () => {
  let component: CoordinatorStuedentsComponent;
  let fixture: ComponentFixture<CoordinatorStuedentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatorStuedentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinatorStuedentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
