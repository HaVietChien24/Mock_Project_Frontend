import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AuthResponse,
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  UserProfileDTO,
} from '../../models/UserModels';
import { JwtService } from '../jwt-service/jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userRootHttp: string = 'http://localhost:5110/api/User/';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  getAllUser(): Observable<any> {
    return this.http.get<any>(this.userRootHttp + 'GetAllUser');
  }

  // Cập nhật phương thức banAccount để nhận tham số isActive
  banAccount(userId: number): Observable<any> {
    // Gửi yêu cầu PUT tới API với isActive
    return this.http.put(`${this.userRootHttp}/BanAccount/${userId}`, {});
  }

  login(body: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.userRootHttp + 'login', body);
  }

  register(body: RegisterDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.userRootHttp + 'register', body);
  }

  updateProfile(body: UserProfileDTO): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(
      this.userRootHttp + 'updateProfile',
      body
    );
  }

  changePassword(body: ChangePasswordDTO): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(
      this.userRootHttp + 'changePassword',
      body
    );
  }

  logout() {
    window.localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
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
