import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  UserProfileDTO,
} from '../../models/UserModels';
import { JwtService } from '../jwt-service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginHttp: string = 'http://localhost:5110/api/User/';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

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

  login(body: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginHttp + 'login', body);
  }

  register(body: RegisterDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginHttp + 'register', body);
  }

  updateProfile(body: UserProfileDTO): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(this.loginHttp + 'updateProfile', body);
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
