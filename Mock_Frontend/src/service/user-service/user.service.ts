import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, LoginDTO, RegisterDTO } from '../../models/UserModels';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginHttp: string = 'http://localhost:5110/api/User/';

  constructor(private http: HttpClient) {}

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
}
