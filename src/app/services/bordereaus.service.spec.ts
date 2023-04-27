import { TestBed } from '@angular/core/testing';

import { BordereausService } from './bordereaus.service';

describe('BordereausService', () => {
  let service: BordereausService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BordereausService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
