import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorClassHistoryComponent } from './tutor-class-history.component';

describe('TutorClassHistoryComponent', () => {
  let component: TutorClassHistoryComponent;
  let fixture: ComponentFixture<TutorClassHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorClassHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorClassHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
