import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs'
import { MovieYTS } from '../MovieYTS';

@Injectable({
  providedIn: 'root'
})
export class YtsService {
  private ytsServiceURL = 'api/yts'
  constructor(private http: HttpClient) {}
  
  getMoviePage (): Observable<MovieYTS[]> {
    return this.http.get<MovieYTS[]>(this.ytsServiceURL)
  }
}
