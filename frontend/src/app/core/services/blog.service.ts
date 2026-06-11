import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BlogApiResponse, BlogResponse, BlogSaveResponse } from '../../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/blogs`;

  createBlog(formData: FormData): Observable<BlogSaveResponse> {
    return this.http.post<BlogSaveResponse>(this.apiUrl, formData);
  }

  getBlogs(): Observable<BlogResponse[]> {
    return this.http.get<BlogResponse[]>(this.apiUrl);
  }

  getBlogBySlug(slug: string): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/${slug}`);
  }

  updateBlog(id: string, formData: FormData): Observable<BlogSaveResponse> {
    return this.http.put<BlogSaveResponse>(`${this.apiUrl}/${id}`, formData);
  }

  deleteBlog(id: string): Observable<BlogApiResponse> {
    return this.http.delete<BlogApiResponse>(`${this.apiUrl}/${id}`);
  }
}
