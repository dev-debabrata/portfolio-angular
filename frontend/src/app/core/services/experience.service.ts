import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  ExperienceForm,
  ExperienceResponse,
  ExperienceSaveResponse,
} from '../../models/experience.model';
import { ApiResponse } from '../../models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/experiences`;

  createExperience(data: ExperienceForm): Observable<ExperienceSaveResponse> {
    return this.http.post<ExperienceSaveResponse>(this.apiUrl, data);
  }

  getExperiences(): Observable<ExperienceResponse> {
    return this.http.get<ExperienceResponse>(this.apiUrl);
  }

  getExperienceById(id: string): Observable<ExperienceResponse> {
    return this.http.get<ExperienceResponse>(`${this.apiUrl}/${id}`);
  }

  updateExperience(id: string, data: ExperienceForm): Observable<ExperienceSaveResponse> {
    return this.http.put<ExperienceSaveResponse>(`${this.apiUrl}/${id}`, data);
  }

  deleteExperience(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
