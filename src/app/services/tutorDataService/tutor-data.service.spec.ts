import { TestBed } from '@angular/core/testing';

import { TutorDataService } from './tutor-data.service';

describe('TutorDataService', () => {
  let service: TutorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
