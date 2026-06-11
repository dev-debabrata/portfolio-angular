import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { BlogService } from '../../../../core/services/blog.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { BlogResponse } from '../../../../models/blog.model';

@Component({
  selector: 'app-admin-blog-list',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './admin-blog-list.html',
  styleUrl: './admin-blog-list.css',
})
export class AdminBlogList implements OnInit {
  private router = inject(Router);
  private blogService = inject(BlogService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  blogs = signal<BlogResponse[]>([]);

  ngOnInit(): void {
    const blogSub = this.blogService.getBlogs().subscribe({
      next: (res) => {
        this.blogs.set(res);
      },

      error: (err) => {
        console.log(err.error?.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      blogSub.unsubscribe();
    });
  }

  deleteBlog(id: string) {
    const confirmed = confirm('Are you sure you want to delete this blog?');

    if (!confirmed) return;

    const deleteSub = this.blogService.deleteBlog(id).subscribe({
      next: (res) => {
        this.blogs.update((items) => items.filter((blog) => blog._id !== id));
        this.snackBarService.success(res.message);
      },
      error: (err) => {
        this.snackBarService.error(err.error?.message || 'Failed to delete');
      },
    });

    this.destroyRef.onDestroy(() => {
      deleteSub.unsubscribe();
    });
  }

  addBlog() {
    this.router.navigate(['/admin/blogs/add']);
  }

  editBlog(slug: string) {
    this.router.navigate(['/admin/blogs/edit', slug]);
  }

  viewBlog(slug: string) {
    this.router.navigate(['/admin/blogs', slug]);
  }
}
