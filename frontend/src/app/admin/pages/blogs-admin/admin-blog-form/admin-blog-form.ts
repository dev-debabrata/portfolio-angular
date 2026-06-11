import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { EMPTY, switchMap } from 'rxjs';

import { BlogService } from '../../../../core/services/blog.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { BlogForm } from '../../../../models/blog.model';

@Component({
  selector: 'app-admin-blog-form',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './admin-blog-form.html',
  styleUrl: './admin-blog-form.css',
})
export class AdminBlogForm implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  imagePreview = signal<string | null>(null);
  tagsInput = signal('');
  editingId = signal<string | null>(null);

  blogs = signal<BlogForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageFile: null,
    tags: [],
    published: true,
  });

  ngOnInit(): void {
    const blogSub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const slug = params.get('slug');
          if (!slug) return EMPTY;
          return this.blogService.getBlogBySlug(slug);
        }),
      )
      .subscribe({
        next: (blog) => {
          this.editingId.set(blog._id);
          this.blogs.set({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            imageFile: null,
            tags: blog.tags || [],
            published: blog.published,
          });
          this.imagePreview.set(blog.image);
        },
        error: (err) => {
          this.snackBarService.error(err.error?.message || 'Blog not found');
          this.router.navigate(['/admin/blogs']);
        },
      });

    this.destroyRef.onDestroy(() => {
      blogSub.unsubscribe();
    });
  }

  // ngOnInit(): void {
  //   const routeSub = this.route.paramMap.subscribe((params) => {
  //     const slug = params.get('slug');

  //     if (!slug) {
  //       return;
  //     }

  //     const blogSub = this.blogService.getBlogBySlug(slug).subscribe({
  //       next: (blog) => {
  //         this.editingId.set(blog._id);

  //         this.blogs.set({
  //           title: blog.title,
  //           slug: blog.slug,
  //           excerpt: blog.excerpt,
  //           content: blog.content,
  //           imageFile: null,
  //           tags: blog.tags || [],
  //           published: blog.published,
  //         });

  //         this.imagePreview.set(blog.image);
  //       },

  //       error: (err) => {
  //         this.snackBarService.error(err.error?.message || 'Blogs not found');
  //         this.router.navigate(['/admin/blogs']);
  //       },
  //     });

  //     this.destroyRef.onDestroy(() => {
  //       blogSub.unsubscribe();
  //     });
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     routeSub.unsubscribe();
  //   });
  // }

  // updateField(field: keyof BlogForm, value: string) {
  //   this.blogs.update((form) => ({
  //     ...form,
  //     [field]: value,
  //   }));
  // }

  updateField<K extends keyof BlogForm>(field: K, value: BlogForm[K]) {
    this.blogs.update((form) => ({
      ...form,
      [field]: value,
    }));
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  updateTitle(title: string) {
    this.blogs.update((form) => ({
      ...form,
      title,
      slug: this.generateSlug(title),
    }));
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    this.blogs.update((blog) => ({
      ...blog,
      imageFile: file,
    }));

    this.imagePreview.set(URL.createObjectURL(file));
  }

  addTags() {
    const value = this.tagsInput().trim();
    if (!value) return;

    const exists = this.blogs().tags.includes(value);
    if (exists) return;

    this.blogs.update((blog) => ({
      ...blog,
      tags: [...blog.tags, value],
    }));

    this.tagsInput.set('');
  }

  removeTag(index: number) {
    this.blogs.update((blog) => ({
      ...blog,
      tags: blog.tags.filter((_, i) => i !== index),
    }));
  }

  removeImage() {
    this.blogs.update((blog) => ({
      ...blog,
      imageFile: null,
    }));

    this.imagePreview.set(null);
  }

  submitBlog() {
    const form = this.blogs();
    const id = this.editingId();

    if (!form.title || !form.slug || !form.excerpt || !form.content || !form.tags.length) {
      this.snackBarService.error('All fields are required');
      return;
    }

    if (!id && !form.imageFile) {
      this.snackBarService.error('Project image is required');
      return;
    }

    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('excerpt', form.excerpt);
    formData.append('content', form.content);
    formData.append('tags', JSON.stringify(form.tags));
    formData.append('published', String(form.published));

    if (form.imageFile) {
      formData.append('image', form.imageFile);
    }

    this.loading.set(true);

    const blogUpdate = id
      ? this.blogService.updateBlog(id, formData)
      : this.blogService.createBlog(formData);

    const blogsSub = blogUpdate.subscribe({
      next: (res) => {
        this.loading.set(false);
        this.snackBarService.success(res.message);
        this.router.navigate(['/admin/blogs']);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBarService.error(err.error?.message || 'Something went wrong');
      },
    });

    this.destroyRef.onDestroy(() => {
      blogsSub.unsubscribe();
    });
  }
}
