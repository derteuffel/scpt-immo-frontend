import { TestBed } from '@angular/core/testing';

import { XlxsService } from './xlxs.service';

describe('XlxsService', () => {
  let service: XlxsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlxsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
