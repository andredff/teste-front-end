import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  apiUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyBhWGh2805HNlHGkeqBbTl2kUtuSL6E_Hw';
  videos: any;
  data: any;
  searchField;

  // private urlParams = {
  //   api_key: 'AIzaSyBhWGh2805HNlHGkeqBbTl2kUtuSL6E_Hw',
  //   url: 'https://www.googleapis.com/youtube/v3/',
  //   full_url: '',
  //   keyword: '',
  //   maxResults: 5,
  //   id: '',
  //   pageToken: ''
  // };

  constructor(private http: HttpClient) { }

  getVideos(term): Observable<any> {
    let maxResults = 9;

    const query = `${this.apiUrl}/search?part=id,snippet&type=video&videoEmbeddable=true&q=${term}&maxResults=${maxResults}&key=${this.apiKey}`;

    return this.http.get(query)
      .pipe(
        tap((response) => { })
        // map((resposta: Response) => resposta.json())
      )

  }

  getVideo(id): Observable<any> {
    const query = `${this.apiUrl}/videos?id=${id}&part=snippet,statistics,player&key=${this.apiKey}`;
    return this.http.get<any>(query)
      .pipe(
        tap((response) => {
          console.log('VideoDetail Info: ' + response.pageInfo.totalResults);
        }),
        // catchError(this.handleError('getVideo', this.params))
      );
  }

}
