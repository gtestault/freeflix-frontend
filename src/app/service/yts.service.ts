import {Injectable} from "@angular/core"
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http"
import {catchError, switchMap, skipWhile, take} from "rxjs/operators"
import {Observable, throwError, timer} from "rxjs"
import {environment} from "../../environments/environment"
import {TorrentStatus} from "./torrentStatus"
import {SearchSettings} from "./../movies/header/header.component"

@Injectable({
  providedIn: "root"
})
export class YtsService {
  private ytsServiceURL = "/api/yts"
  private requestMovieURL = "/api/movie/request"
  private torrentStatusURL = "/api/movie/status"
  private torrentDeleteURL = "/api/movie/delete"
  private magnetAddURL = '/api/movie/add'

  constructor(private http: HttpClient) {
  }

  getMoviePage(searchSettings: SearchSettings): Observable<any[]> {
    const params = {}
    if (searchSettings.page) {
      params["page"] = searchSettings.page
    }
    if (searchSettings.query) {
      params["query"] = searchSettings.query
    }
    if (searchSettings.rating) {
      params["rating"] = searchSettings.rating
    }
    if (searchSettings.searchSorting) {
      params["sort_by"] = searchSettings.searchSorting
    }
    if (searchSettings.searchOrder) {
      if (searchSettings.searchOrder === "ascending") {
        params["order_by"] = "asc"
      } else {
        params["order_by"] = "desc"
      }
    }
    return this.http.get<any[]>(environment.endpoint + this.ytsServiceURL, {params: params})
      .pipe(
        catchError(this.handleError)
      )
  }

  requestMovie(infoHash: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      environment.endpoint + this.requestMovieURL,
      {
        observe: "response", params: {"infoHash": infoHash}
      })
      .pipe(
        catchError(this.handleError)
      )
  }
  addMagnet(magnetURI: string): Observable<{}> {
    return this.http.get(environment.endpoint + this.magnetAddURL, {params: {"magnetURI": magnetURI}})
  }

  getTorrentStatus(): Observable<TorrentStatus[]> {
    return this.http.get<any>(environment.endpoint + this.torrentStatusURL)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteTorrent(infoHash: string): Observable<{}> {
    return this.http.delete(environment.endpoint + this.torrentDeleteURL, {params: {"infoHash": infoHash}})
      .pipe(
        catchError(this.handleError)
      )
  }

  // We want to poll until the server tells us the torrent is available
  pollForMovieFetched(infoHash: string): Observable<HttpResponse<any>> {
    return timer(0, 5000).pipe(
      switchMap(_ => this.requestMovie(infoHash)),
      skipWhile((res: HttpResponse<any>) => res.status !== 202),
      take(1)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`)
    }
    // return an observable with a user-facing error message
    return throwError(
      "Something bad happened; please try again later.")
  }
}
