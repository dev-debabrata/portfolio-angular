import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Project, ProjectApiResponse, ProjectSaveResponse } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/projects`;

  createProject(formData: FormData): Observable<ProjectSaveResponse> {
    return this.http.post<ProjectSaveResponse>(this.apiUrl, formData);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: string, formData: FormData): Observable<ProjectSaveResponse> {
    return this.http.put<ProjectSaveResponse>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProject(id: string): Observable<ProjectApiResponse> {
    return this.http.delete<ProjectApiResponse>(`${this.apiUrl}/${id}`);
  }
}
