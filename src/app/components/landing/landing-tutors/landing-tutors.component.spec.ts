import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTutorsComponent } from './landing-tutors.component';

describe('LandingTutorsComponent', () => {
  let component: LandingTutorsComponent;
  let fixture: ComponentFixture<LandingTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingTutorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
