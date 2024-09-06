import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorChatComponent } from './tutor-chat.component';

describe('TutorChatComponent', () => {
  let component: TutorChatComponent;
  let fixture: ComponentFixture<TutorChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
