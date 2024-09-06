import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorClassesComponent } from './tutor-classes.component';

describe('TutorClassesComponent', () => {
  let component: TutorClassesComponent;
  let fixture: ComponentFixture<TutorClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
