import { TestBed } from '@angular/core/testing';

import { Garde1Guard } from './garde1.guard';

describe('Garde1Guard', () => {
  let guard: Garde1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Garde1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
