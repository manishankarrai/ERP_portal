import { TestBed } from '@angular/core/testing';

import { CommonhttpService } from './commonhttp.service';

describe('CommonhttpService', () => {
  let service: CommonhttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonhttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
