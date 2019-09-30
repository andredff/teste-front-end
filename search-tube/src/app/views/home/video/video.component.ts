import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../shared/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videos = {};
  error;
  term;
  nextPageToken: string;

  vid: any[] = [];

  blockInfiniteScroll;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getVideos(this.term);

  }

  getVideos(term) {
    if (term != this.term) {
      this.vid = [];
    }
    this.term = term

    if (term) {
      setTimeout(() => {
        this.videoService.getVideos(this.term, this.nextPageToken)
          .subscribe((videos) => {

            this.videos = videos;

            if (videos.nextPageToken) {
              this.nextPageToken = videos.nextPageToken;
            }

            for (let i = 0; i < videos.items.length; i++) {
              let video = videos.items[i];
              this.vid.push(video);
            }



          }, error => {
            console.error(error)
            this.error = 'Erro Aqui'
          });
      }, 1000);
    }
  }

  loadMore() {
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        console.log('bottom')
        this.getVideos(this.term);

      }
    }
  }

  scrollToTop(evt) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

}
