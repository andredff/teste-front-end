import { VideoComponent } from '../video.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VideoService } from '../../../shared/services/video.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  video: {};
  safeSrc: SafeResourceUrl;

  constructor(private videoService: VideoService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getVideo()
  }

  getVideo() {
    this.route.params.subscribe((params: Params) => {
      this.videoService.getVideo(params.id).subscribe((response) => {
        this.video = response.items[0];
      })
      const URL = `https://www.youtube.com/embed/${params.id}`;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL);
    })
  }

}
