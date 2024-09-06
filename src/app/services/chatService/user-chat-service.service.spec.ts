import { TestBed } from '@angular/core/testing';

import { UserChatServiceService } from './user-chat-service.service';

describe('UserChatServiceService', () => {
  let service: UserChatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
