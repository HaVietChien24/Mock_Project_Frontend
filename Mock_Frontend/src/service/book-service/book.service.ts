import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../api/link-api';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  linkApi: ApiLink = new ApiLink();
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.linkApi.getAllBooks);
  }

  getByGenreId(id: number): Observable<any> {
    return this.http.get<any>(`${this.linkApi.getBooksByGenreId}/${id}`);
  }

  searchByTitleOrAuthor(search: string): Observable<any> {
    return this.http.get<any>(this.linkApi.searchByTitleOrAuthor, {
      params: { search: search },
    });
  }
}
