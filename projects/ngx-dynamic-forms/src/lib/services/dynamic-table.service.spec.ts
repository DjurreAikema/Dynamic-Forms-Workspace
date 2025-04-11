import {TestBed} from '@angular/core/testing';
import {DynamicTableService} from 'ngx-dynamic-forms';

describe('DynamicTableService', () => {
  let service: DynamicTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
