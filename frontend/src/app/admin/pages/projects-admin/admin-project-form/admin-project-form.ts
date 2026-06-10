import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { EMPTY, switchMap } from 'rxjs';

import { ProjectService } from '../../../../core/services/project.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { ProjectForm } from '../../../../models/project.model';

@Component({
  selector: 'app-admin-project-form',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './admin-project-form.html',
  styleUrl: './admin-project-form.css',
})
export class AdminProjectForm implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  imagePreview = signal<string | null>(null);
  technologyInput = signal('');
  editingId = signal<string | null>(null);

  projects = signal<ProjectForm>({
    title: '',
    description: '',
    category: '',
    imageFile: null,
    technologies: [],
    liveUrl: '',
    githubUrl: '',
  });

  ngOnInit(): void {
    const projectSub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          if (!id) return EMPTY;

          this.editingId.set(id);

          return this.projectService.getProjectById(id);
        }),
      )
      .subscribe({
        next: (project) => {
          this.projects.set({
            title: project.title,
            description: project.description,
            category: project.category,
            imageFile: null,
            technologies: project.technologies || [],
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
          });

          this.imagePreview.set(project.image);
        },
        error: (err) => {
          this.snackBarService.error(err.error?.message || 'Project not found');
          this.router.navigate(['/admin/projects']);
        },
      });

    this.destroyRef.onDestroy(() => {
      projectSub.unsubscribe();
    });
  }

  // ngOnInit(): void {
  //   const routeSub = this.route.paramMap.subscribe((params) => {
  //     const id = params.get('id');

  //     if (!id) return;

  //     this.editingId.set(id);

  //     const projectSub = this.projectService.getProjectById(id).subscribe({
  //       next: (project) => {
  //         this.projects.set({
  //           title: project.title,
  //           description: project.description,
  //           category: project.category,
  //           imageFile: null,
  //           technologies: project.technologies || [],
  //           liveUrl: project.liveUrl || '',
  //           githubUrl: project.githubUrl || '',
  //         });

  //         this.imagePreview.set(project.image);
  //       },
  //       error: (err) => {
  //         this.snackBarService.error(err.error?.message || 'Project not found');
  //         this.router.navigate(['/admin/projects']);
  //       },
  //     });

  //     this.destroyRef.onDestroy(() => {
  //       projectSub.unsubscribe();
  //     });
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     routeSub.unsubscribe();
  //   });
  // }

  // updateField(field: keyof ProjectForm, value: string) {

  updateField<K extends keyof ProjectForm>(field: K, value: ProjectForm[K]) {
    this.projects.update((project) => ({
      ...project,
      [field]: value,
    }));
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    this.projects.update((project) => ({
      ...project,
      imageFile: file,
    }));

    this.imagePreview.set(URL.createObjectURL(file));
  }

  addTechnology() {
    const value = this.technologyInput().trim();
    if (!value) return;

    const exists = this.projects().technologies.includes(value);
    if (exists) return;

    this.projects.update((project) => ({
      ...project,
      technologies: [...project.technologies, value],
    }));

    this.technologyInput.set('');
  }

  removeTechnology(index: number) {
    this.projects.update((project) => ({
      ...project,
      technologies: project.technologies.filter((_, i) => i !== index),
    }));
  }

  removeImage() {
    this.projects.update((project) => ({
      ...project,
      imageFile: null,
    }));

    this.imagePreview.set(null);
  }

  submitProject() {
    const form = this.projects();
    const id = this.editingId();

    if (!form.title || !form.description || !form.category) {
      this.snackBarService.error('All fields are required');
      return;
    }

    if (!id && !form.imageFile) {
      this.snackBarService.error('Project image is required');
      return;
    }

    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('technologies', JSON.stringify(form.technologies));
    formData.append('liveUrl', form.liveUrl);
    formData.append('githubUrl', form.githubUrl);

    if (form.imageFile) {
      formData.append('image', form.imageFile);
    }

    this.loading.set(true);

    const projectUpdate = id
      ? this.projectService.updateProject(id, formData)
      : this.projectService.createProject(formData);

    const projectSub = projectUpdate.subscribe({
      next: (res) => {
        this.loading.set(false);
        this.snackBarService.success(res.message);
        this.router.navigate(['/admin/projects']);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBarService.error(err.error?.message || 'Something went wrong');
      },
    });

    this.destroyRef.onDestroy(() => {
      projectSub.unsubscribe();
    });
  }
}
