import { TestBed, async, inject } from '@angular/core/testing';

import { IsConnectedGuard } from './is-connected.guard';

describe('IsConnectedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsConnectedGuard]
    });
  });

  it('should ...', inject([IsConnectedGuard], (guard: IsConnectedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
