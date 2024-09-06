import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { coordinatorGuard } from './coordinator.guard';

describe('coordinatorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => coordinatorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
