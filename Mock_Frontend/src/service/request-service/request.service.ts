import { Injectable } from '@angular/core';
import { ApiLink } from '../../api/link-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  linkApi: ApiLink = new ApiLink();
  constructor(private http: HttpClient) {}

  getAllByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.linkApi.getAllRequestsByUserId}/${id}`);
  }

  cancelRequest(requestId: number): Observable<any> {
    return this.http.put<any>(`${this.linkApi.cancelRequest}`, requestId);
  }
}
