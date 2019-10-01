import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { VideoService } from '../../shared/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  public videos = {};

  public error: string;

  public vid: any[] = [];

  public videoStorage = [];

  public lastTerm: string;

  public nextPageToken: string;

  public lastToken: string;

  public loading: boolean = false;

  public init: boolean = false;

  @Output() public atualizarEstado: EventEmitter<string> = new EventEmitter<string>();

  constructor(private videoService: VideoService) { }

  ngOnInit() {

    // localStorage.clear();
    this.videoStorage = [];

    setTimeout(() => {
      this.videoStorage = JSON.parse(localStorage.getItem('videoStorage'));
    }, 1000);

    if (this.videoStorage != null) {
      setTimeout(() => {
        this.atualizaEstado();
      }, 10);
    };
    this.lastTerm = localStorage.getItem('term');
  }

  getVideos(term) {
    this.vid = [];
    if (term != this.lastTerm) {
      this.resetTerm();
    }
    this.lastTerm = term;
    this.lastToken = localStorage.getItem('lastToken');

    if (term) {
      this.videoService.getVideos(this.lastTerm, this.lastToken)
        .subscribe((videos) => {
          this.loading = true;

          if (videos.pageInfo.totalResults == 0) {
            this.init = true;
          } else {
            this.init = false;
          }

          this.videos = videos;
          if (videos.nextPageToken) {
            this.nextPageToken = videos.nextPageToken;
          }

          for (let i = 0; i < videos.items.length; i++) {
            let video = videos.items[i];
            this.vid.push(video);
          }
          this.videoStorage = this.videoStorage.concat(this.vid)
          this.setCache();
          this.loading = false;
        }, error => {
          this.init = true;
          this.loading = false;
          localStorage.clear();
        });
    }
  }

  resetTerm() {
    this.vid = [];
    this.videoStorage = [];
    this.lastToken = undefined;
  }

  atualizaEstado() {
    this.atualizarEstado.emit('final');
  }

  clearCache() {
    localStorage.clear();
    this.videoStorage = [];
    this.init = false;
  }

  setCache() {
    localStorage.setItem('videoStorage', JSON.stringify(this.videoStorage));
    localStorage.setItem('lastToken', this.nextPageToken);
    localStorage.setItem('term', this.lastTerm);
  }

  loadMore() {
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.getVideos(this.lastTerm);
      }
    };
  }

  scrollToTop(evt) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() { }


}
