import { TestBed } from '@angular/core/testing';

import { CovidCallService } from './covid-call.service';

describe('CovidCallService', () => {
  let service: CovidCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
