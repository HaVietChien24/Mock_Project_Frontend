import { Injectable } from '@angular/core';
import { ApiLink } from '../../api/link-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  linkApi: ApiLink = new ApiLink();
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.linkApi.getAllGenres);
  }
}
