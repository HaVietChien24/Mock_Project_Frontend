import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, LoginDTO } from '../../models/UserModels';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    login(body: LoginDTO): Observable<AuthResponse> {
        return this.http.post<AuthResponse>('http://localhost:5110/api/User/login', body)
    }
}
