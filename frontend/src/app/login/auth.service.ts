import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api/auth';

login (user: UserLogin) {
    return this.http.post(`${this.baseUrl}/login`,  user);
  }
  
  getCurrentUser(): { id: string, username: string } | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        username: payload.username
      };
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }
}
