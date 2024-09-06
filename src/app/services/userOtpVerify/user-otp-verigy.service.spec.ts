import { TestBed } from '@angular/core/testing';

import { otpVerifyService } from './user-otp-verify.service';

describe('UserOtpVerigyService', () => {
  let service: otpVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(otpVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
