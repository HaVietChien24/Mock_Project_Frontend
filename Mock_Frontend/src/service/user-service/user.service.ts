import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginDTO } from '../../models/UserModels';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt-service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  login(body: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'http://localhost:5110/api/User/login',
      body
    );
  }
  private getUserUrl = 'http://localhost:5110/api/User/GetAllUser';
  private BanAcountUrl = 'http://localhost:5110/api/User/BanAccount';

  getAllUser(): Observable<any> {
    return this.http.get<any>(this.getUserUrl);
  }

  // Cập nhật phương thức banAccount để nhận tham số isActive
  banAccount(userId: number): Observable<any> {
    // Gửi yêu cầu PUT tới API với isActive
    return this.http.put(`${this.BanAcountUrl}/${userId}`, {});
  }

  loadUserFromStorage(): any {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      var token = window.localStorage.getItem('userToken')?.toString();
      if (token) {
        return this.jwtService.decodeToken(token);
      }
    }
    return null;
  }
}
