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

  public term: string;

  public lastTerm: string;

  public nextPageToken: string;

  public lastToken: string;

  @Output() public inputOnTop: EventEmitter<string> = new EventEmitter<string>();


  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getVideos(this.term);

    // localStorage.clear();

    this.videoStorage = JSON.parse(localStorage.getItem('videoStorage'))

    this.lastTerm = localStorage.getItem('term')

  }

  getVideos(term) {

    this.vid = [];
    if (term != this.lastTerm) {
      this.vid = [];
      this.videoStorage = [];
      this.lastToken = undefined;
    }
    this.lastTerm = term
    this.lastToken = localStorage.getItem('lastToken');

    if (term) {
      setTimeout(() => {

        this.videoService.getVideos(this.lastTerm, this.lastToken)
          .subscribe((videos) => {
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

          }, error => {
            console.error(error)
            this.error = 'Erro Aqui'
          });
      }, 1000);
    }
  }


  limpar(){
    localStorage.clear();
    this.videoStorage = [];
  }

  setCache() {

    localStorage.setItem('videoStorage', JSON.stringify(this.videoStorage));
    localStorage.setItem('lastToken', this.nextPageToken);
    localStorage.setItem('term', this.lastTerm);
  }

  loadMore() {
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        console.log('bottom')
        this.getVideos(this.lastTerm);

      }
    };
  }

  scrollToTop(evt) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {}


}
