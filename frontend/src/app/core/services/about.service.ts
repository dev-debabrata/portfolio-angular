import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { About } from '../../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/about`;

  saveAbout(data: About): Observable<{ message: string; about: About }> {
    return this.http.post<{ message: string; about: About }>(this.apiUrl, data);
  }

  getAbout(): Observable<About> {
    return this.http.get<About>(this.apiUrl);
  }
}
