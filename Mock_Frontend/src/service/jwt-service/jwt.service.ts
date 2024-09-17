import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
