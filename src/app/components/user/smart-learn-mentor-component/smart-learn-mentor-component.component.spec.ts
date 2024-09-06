import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLearnMentorComponentComponent } from './smart-learn-mentor-component.component';

describe('SmartLearnMentorComponentComponent', () => {
  let component: SmartLearnMentorComponentComponent;
  let fixture: ComponentFixture<SmartLearnMentorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartLearnMentorComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartLearnMentorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
