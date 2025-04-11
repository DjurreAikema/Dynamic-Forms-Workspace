import { TestBed } from '@angular/core/testing';

import { NgxDynamicFormsService } from './ngx-dynamic-forms.service';

describe('NgxDynamicFormsService', () => {
  let service: NgxDynamicFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
