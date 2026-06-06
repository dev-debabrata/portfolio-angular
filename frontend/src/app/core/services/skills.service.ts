import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse, SkillResponse, SkillSaveResponse } from '../../models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/skills`;

  getSkills(): Observable<SkillResponse[]> {
    return this.http.get<SkillResponse[]>(this.apiUrl);
  }

  // getSkillById(id: string): Observable<SkillResponse> {
  //   return this.http.get<SkillResponse>(`${this.apiUrl}/${id}`);
  // }

  createSkill(data: FormData): Observable<SkillSaveResponse> {
    return this.http.post<SkillSaveResponse>(this.apiUrl, data);
  }

  // updateSkill(id: string, data: FormData): Observable<SkillSaveResponse> {
  //   return this.http.put<SkillSaveResponse>(`${this.apiUrl}/${id}`, data);
  // }

  deleteSkill(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
