import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VideoService } from './video.service';

describe('VideoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: VideoService = TestBed.get(VideoService);
    expect(service).toBeTruthy();
  });
});
