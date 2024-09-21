import { Injectable } from '@angular/core';
import { ApiLink } from '../../api/link-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  linkApi: ApiLink = new ApiLink();
  constructor(private http: HttpClient) { }

  getAllByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.linkApi.getAllRequestsByUserId}/${id}`);
  }
  getAllByAllUser(): Observable<any> {
    return this.http.get<any>(`${this.linkApi.getAllRequestsByAllUser}`);
  }

  cancelRequest(requestId: number): Observable<any> {
    return this.http.put<any>(`${this.linkApi.cancelRequest}`, requestId);
  }

  updateRequestStatus(borrowingId: number, action: string): Observable<any> {
    const params = new HttpParams()
      .set('borrowingId', borrowingId.toString())
      .set('action', action);

    return this.http.post<any>(`${this.linkApi.updateRequestStatus}`, null, { params });
  }


}
