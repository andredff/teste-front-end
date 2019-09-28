import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videos = {};
  error;
  term;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.atualizarVideos(this.term);
  }

  atualizarVideos(term) {
    this.term = term

    if (term) {
      setTimeout(() => {
        this.videoService.getVideos(this.term)
          .subscribe((response) => {
            this.videos = response.items;
            console.log(this.videos);
          }, error => {
            console.error(error)
            this.error = 'Erro Aqui'
          });
      }, 1000);
    }
  }




}
