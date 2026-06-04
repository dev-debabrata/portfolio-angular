import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ImageResponse, ResumeResponse } from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/upload`;

  // uploadProfileImage(file: File): Observable<ImageResponse> {
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   return this.http.post<ImageResponse>(`${this.apiUrl}/profile`, formData);
  // }

  // uploadResume(file: File): Observable<ResumeResponse> {
  //   const formData = new FormData();
  //   formData.append('resume', file);
  //   return this.http.post<ResumeResponse>(`${this.apiUrl}/resume`, formData);
  // }

  // getProfileImage(): Observable<ImageResponse> {
  //   return this.http.get<ImageResponse>(`${this.apiUrl}/profile`);
  // }

  // getResumeUrl(): Observable<ResumeResponse> {
  //   return this.http.get<ResumeResponse>(`${this.apiUrl}/resume`);
  // }

  // getResumeViewUrl(): string {
  //   return `${this.apiUrl}/resume/view`;
  // }

  // getResumeUrl(): Observable<{ resumeUrl: string }> {
  //   return this.http.get<{ resumeUrl: string }>(`${this.apiUrl}/resume`);
  // }

  // saveResumeUrl(resumeUrl: string): Observable<ResumeResponse> {
  //   return this.http.post<ResumeResponse>(`${environment.apiUrl}/resume`, {
  //     resumeUrl,
  //   });
  // }

  // getResumeUrl(): Observable<ResumeResponse> {
  //   return this.http.get<ResumeResponse>(`${environment.apiUrl}/resume`);
  // }
}
