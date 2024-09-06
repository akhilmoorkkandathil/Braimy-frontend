import { TestBed } from '@angular/core/testing';

import { TutorChatService } from './tutor-chat.service';

describe('TutorChatService', () => {
  let service: TutorChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
