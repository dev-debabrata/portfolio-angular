import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';

import { BlogService } from '../../../../core/services/blog.service';
import { BlogResponse } from '../../../../models/blog.model';
import { SnackBarService } from '../../../../core/services/snack-bar.service';

@Component({
  selector: 'app-admin-blog-detail',
  standalone: true,
  imports: [],
  templateUrl: './admin-blog-detail.html',
  styleUrl: './admin-blog-detail.css',
})
export class AdminBlogDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  blog = signal<BlogResponse | null>(null);
  isLoading = signal(false);
  imagePopup = signal(false);

  ngOnInit(): void {
    const blogSub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const blogSlug = params.get('slug');

          if (!blogSlug) return EMPTY;

          this.blog.set(null);
          return this.blogService.getBlogBySlug(blogSlug);
        }),
      )
      .subscribe({
        next: (res) => {
          this.blog.set(res);
        },

        error: (err) => {
          this.snackBarService.error(err.error?.message || 'Blog not Found');
        },
      });

    this.destroyRef.onDestroy(() => {
      blogSub.unsubscribe();
    });
  }
}
