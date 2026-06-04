import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../models/admin.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private api = `${environment.apiUrl}/admin`;

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.api}/login`, {
      email,
      password,
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('adminToken');
    }
    return this.http.post(`${this.api}/logout`, {});
  }

  getProfile() {
    return this.http.get(`${this.api}/profile`);
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('adminToken', token);
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('adminToken');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
