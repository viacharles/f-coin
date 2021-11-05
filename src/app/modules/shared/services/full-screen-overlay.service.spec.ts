import { TestBed } from '@angular/core/testing';

import { FullScreenOverlayService } from './full-screen-overlay.service';

describe('FullScreenOverlayService', () => {
  let service: FullScreenOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullScreenOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
