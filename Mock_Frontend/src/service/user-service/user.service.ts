import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUserUrl = "http://localhost:5110/api/User/GetAllUser";
  private BanAcountUrl = "http://localhost:5110/api/User/BanAccount";
  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.httpClient.get<any>(this.getUserUrl);
  }

  // Cập nhật phương thức banAccount để nhận tham số isActive
  banAccount(userId: number): Observable<any> {
    // Gửi yêu cầu PUT tới API với isActive
    return this.httpClient.put(`${this.BanAcountUrl}/${userId}`, {});
  }

}


