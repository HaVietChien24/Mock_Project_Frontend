import { Injectable } from '@angular/core';
import { ApiLink } from '../../api/link-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  linkApi: ApiLink = new ApiLink();

  constructor(private http: HttpClient) {}

  getByUserId(userId: number): Observable<any> {
    return this.http.get<any>(this.linkApi.getWishlistByUserId, {
      params: { id: userId },
    });
  }

  addToWishlist(userId: number, bookId: number): Observable<any> {
    const body = { UserId: +userId, BookId: bookId };
    return this.http.post<any>(this.linkApi.addBookToWishlist, body);
  }

  updateDetailsQuantity(detailsId: number, quantity: number): Observable<any> {
    const body = { DetailsId: detailsId, Quantity: quantity };
    return this.http.put<any>(this.linkApi.updateWishlistDetailQuantity, body);
  }
}
