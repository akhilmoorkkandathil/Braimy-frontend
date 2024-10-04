import { TestBed } from '@angular/core/testing';

import { CoordinatorDataService } from './coordinator-data.service';

describe('CoordinatorDataService', () => {
  let service: CoordinatorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordinatorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
