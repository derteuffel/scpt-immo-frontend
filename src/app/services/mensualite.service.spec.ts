import { TestBed } from '@angular/core/testing';

import { MensualiteService } from './mensualite.service';

describe('MensualiteService', () => {
  let service: MensualiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensualiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
