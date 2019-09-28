import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('videos', {static: false}) public videos: any

  constructor() { }

  ngOnInit() {
  }

  atualizarVideos(term){
    this.videos.atualizarVideos(term);

  }



}
