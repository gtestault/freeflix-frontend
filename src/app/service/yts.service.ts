import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, switchMap, skipWhile, take } from 'rxjs/operators';
import { Observable, throwError, timer } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class YtsService {
  private ytsServiceURL = '/api/yts'
  private requestMovieURL = '/api/movie/request'
  constructor(private http: HttpClient) { }

  getMoviePage(): Observable<any[]> {
    return this.http.get<any[]>(environment.endpoint + this.ytsServiceURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  requestMovie(infoHash: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      environment.endpoint + this.requestMovieURL,
      {
        observe: 'response', params: { "infoHash": infoHash }
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  //we want to poll until the server tells us the torrent is available
  pollForMovieFetched(infoHash: string): Observable<HttpResponse<any>> {
    return timer(0, 5000).pipe(
      switchMap(_ => this.requestMovie(infoHash)),
      skipWhile((res: HttpResponse<any>) => res.status !== 202),
      take(1)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}