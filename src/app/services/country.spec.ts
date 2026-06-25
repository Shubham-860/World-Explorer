import { TestBed } from '@angular/core/testing';

import { Country } from './CountryService';

describe('Country', () => {
  let service: Country;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Country);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
