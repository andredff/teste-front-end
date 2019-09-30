export class ResponseParams {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
      totalResults: number;
      resultsPerPage: number;
  };
  items: [];
}
