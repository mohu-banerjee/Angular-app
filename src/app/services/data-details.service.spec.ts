import { TestBed } from '@angular/core/testing';

import { DataDetailsService } from './data-details.service';

describe('DataDetailsService', () => {
  let service: DataDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
