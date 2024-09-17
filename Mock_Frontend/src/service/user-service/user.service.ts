import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, LoginDTO, RegisterDTO } from '../../models/UserModels';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    loginHttp: string = 'http://localhost:5110/api/User/';

    constructor(private http: HttpClient) { }

    login(body: LoginDTO): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.loginHttp + 'login', body)
    }

    register(body: RegisterDTO): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.loginHttp + 'register', body)
    }
}
