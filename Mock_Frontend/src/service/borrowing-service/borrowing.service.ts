import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../api/link-api';


@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  private apiLink: ApiLink;
  constructor(private http: HttpClient) {
    this.apiLink = new ApiLink();
  }
  GetAllBookBorrowAdmin(): Observable<any> {
    const url = this.apiLink.GetAllBookBorrow;
    return this.http.get<any>(url);
  }
  GetBookBorrowingDetail(borrowingId: number): Observable<any> {
    const url = this.apiLink.GetBookBorrowingDetail;
    return this.http.get<any>(url + "?borrowingId=" + borrowingId)
  }
  UpdateBookReturned(borrowingDetailId: number, returnedBooks: number): Observable<any> {
    const url = this.apiLink.UpdateBookReturned;
    const body = {
      borrowingDetailId: borrowingDetailId,
      numberBookReturned: returnedBooks
    };

    return this.http.put<any>(url, body);
  }
  ConfirmPickedUp(id: number): Observable<any> {
    const url = `${this.apiLink.ConfirmPickedUp}?borrowingId=${id}`;
    const body = {};
    return this.http.put<any>(url, body);
  }
  ViewListBookBorrowingUser(userId: number): Observable<any> {
    const url = this.apiLink.ViewListBookBorrowingUser;
    return this.http.get<any>(url + "?userId=" + userId);
  }

}
