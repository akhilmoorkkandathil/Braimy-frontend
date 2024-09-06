import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLearnMentorComponent } from './smart-learn-mentor.component';

describe('SmartLearnMentorComponent', () => {
  let component: SmartLearnMentorComponent;
  let fixture: ComponentFixture<SmartLearnMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartLearnMentorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartLearnMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
