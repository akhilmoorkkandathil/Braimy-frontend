import { TestBed } from '@angular/core/testing';

import { TutorChatServiceService } from './tutor-chat-service.service';

describe('TutorChatServiceService', () => {
  let service: TutorChatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
