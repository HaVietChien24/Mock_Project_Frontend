import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../api/link-api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  linkApi: ApiLink = new ApiLink();
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getAll(pageNumber?: number, pageSize?: number): Observable<any> {
    if (pageNumber && pageSize)
      return this.http.get<any>(this.linkApi.getAllBooks, {
        params: { pageNumber: pageNumber, pageSize: pageSize },
      });
    return this.http.get<any>(this.linkApi.getAllBooks);
  }

  getByGenreId(
    id: number,
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> {
    if (pageNumber && pageSize)
      return this.http.get<any>(`${this.linkApi.getBooksByGenreId}/${id}`, {
        params: { pageNumber: pageNumber, pageSize: pageSize },
      });
    return this.http.get<any>(`${this.linkApi.getBooksByGenreId}/${id}`);
  }

  searchByTitleOrAuthor(
    search: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> {
    if (pageNumber && pageSize)
      return this.http.get<any>(this.linkApi.searchByTitleOrAuthor, {
        params: { search: search, pageNumber: pageNumber, pageSize: pageSize },
      });
    return this.http.get<any>(this.linkApi.searchByTitleOrAuthor, {
      params: { search: search },
    });
  }
  // Phương thức để thêm sách
  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.linkApi.addBook, book);
  }

  updateBook(book: any): Observable<any> {
    return this.http.post<any>(this.linkApi.updateBook, book);
  }

  getById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.linkApi.getBookById}/${bookId}`);
  }

  viewBookDetails(bookId: number): void {
    this.getById(bookId).subscribe({
      next: (response) => {
        const book = response;
        this.router.navigate(['/book-details'], { queryParams: book });
      },
      error: (error) => {
        this.toastr.error('Some errors occured: ', error.message);
      },
    });
  }
}
