import { VideoModel } from './../interfaces/Video.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators'

import { ResponseParams } from '../interfaces/ResponseParams.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  apiUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyBhWGh2805HNlHGkeqBbTl2kUtuSL6E_Hw';
  apiKey2 = 'AIzaSyBi56wwF6ujlKQJAPXfcRU6tJgo5a3JTEE';
  videos: any;
  data: any;
  searchField;
  nextToken;
  query;

  public lastQuery: string;

  constructor(private http: HttpClient) { }

  getVideos(term, nextPageToken): Observable<ResponseParams> {

    let maxResults = 3;
    if (term != this.searchField) {
      this.searchField = term;
    }

    if (nextPageToken != this.nextToken) {
      this.nextToken = nextPageToken;
    }

    if (nextPageToken) {
      this.query = `${this.apiUrl}/search?part=id,snippet&type=video&videoEmbeddable=true&pageToken=${nextPageToken}&q=${term}&maxResults=${maxResults}&key=${this.apiKey2}`;
    } else {
      this.query = `${this.apiUrl}/search?part=id,snippet&type=video&videoEmbeddable=true&q=${term}&maxResults=${maxResults}&key=${this.apiKey}`;
    }


    return this.http.get<ResponseParams>(this.query)
      .pipe(
        map((response) => {
          return response;

        })
      );

  }


  getVideo(id): Observable<VideoModel> {
    const query = `${this.apiUrl}/videos?id=${id}&part=snippet,statistics,player&key=${this.apiKey2}`;
    return this.http.get<VideoModel>(query)
      .pipe(
        map((response) => {
          return response;
        }),
        // catchError(this.handleError('getVideo', this.params))
      );
  }

}
