import { TestBed } from '@angular/core/testing';

import { ValidaEmailService } from './valida-email.service';

describe('ValidaEmailService', () => {
  let service: ValidaEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidaEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
