import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  ProfileForm,
  ProfileImageResponse,
  ProfileResponse,
  ProfileSaveResponse,
  ResumeResponse,
} from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profile`;

  uploadProfileImage(file: File): Observable<ProfileImageResponse> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ProfileImageResponse>(`${this.apiUrl}/image`, formData);
  }

  updateProfileContent(data: ProfileForm): Observable<ProfileSaveResponse> {
    return this.http.put<ProfileSaveResponse>(this.apiUrl, data);
  }

  // updateProfileContent(data: {
  //   greeting: string;
  //   firstName: string;
  //   lastName: string;
  //   role: string;
  //   profileDescription: string;
  // }) {
  //   return this.http.put(`${this.apiUrl}/profile-content`, data);
  // }

  // updateProfileContent(profileDescription: string): Observable<ProfileResponse> {
  //   return this.http.put<ProfileResponse>(`${this.apiUrl}/profile-content`, {
  //     profileDescription,
  //   });
  // }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.apiUrl);
  }

  saveResumeUrl(resumeUrl: string): Observable<ResumeResponse> {
    return this.http.post<ResumeResponse>(`${this.apiUrl}/resume`, {
      resumeUrl,
    });
  }

  getResumeUrl(): Observable<ResumeResponse> {
    return this.http.get<ResumeResponse>(`${this.apiUrl}/resume`);
  }
}
