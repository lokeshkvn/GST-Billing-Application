import { TestBed, inject } from '@angular/core/testing';

import { GstService } from './gst.service.ts.service';

describe('Gst.Service.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GstService]
    });
  });

  it('should be created', inject([GstService], (service: GstService) => {
    expect(service).toBeTruthy();
  }));
});
