import { TestBed } from '@angular/core/testing';

import { BorrwingDetailService } from './borrwing-detail.service';

describe('BorrwingDetailService', () => {
  let service: BorrwingDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrwingDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
