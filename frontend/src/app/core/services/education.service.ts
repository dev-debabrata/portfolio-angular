import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/educations`;
}
