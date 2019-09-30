import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('videos', {static: false}) public videos: any

  @ViewChild('search', {static: false}) public search: any

  constructor() { }

  ngOnInit() {
  }

  atualizarVideos(term){
    this.videos.getVideos(term);

  }

  limparPesquisa(){
    this.videos.limpar();
  }

}
