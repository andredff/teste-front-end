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
  videos: any;
  data: any;
  searchField;
  nextToken;
  query;

  public lastQuery: string;

  constructor(private http: HttpClient) { }

  getVideos(term, nextPageToken): Observable<ResponseParams> {

    let maxResults = 1;
    if (term != this.searchField) {
      this.searchField = term;
    }

    if (nextPageToken != this.nextToken) {
      this.nextToken = nextPageToken;
    }

    if (nextPageToken) {
      this.query = `${this.apiUrl}/search?part=id,snippet&type=video&videoEmbeddable=true&pageToken=${nextPageToken}&q=${term}&maxResults=${maxResults}&key=${this.apiKey}`;
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

  getVideo(id): Observable<ResponseParams> {
    const query = `${this.apiUrl}/videos?id=${id}&part=snippet,statistics,player&key=${this.apiKey}`;
    return this.http.get<ResponseParams>(query)
      .pipe(
        map((response) => {
          return response;
        }),

      );
  }

}
