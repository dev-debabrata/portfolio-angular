import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { ProjectService } from '../../../../core/services/project.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-admin-project-list',
  standalone: true,
  imports: [LucideAngularModule, UpperCasePipe],
  templateUrl: './admin-project-list.html',
  styleUrl: './admin-project-list.css',
})
export class AdminProjectList implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  projects = signal<Project[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    const projectSub = this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects.set(res);
        // console.log(res);
      },
      error: (err) => {
        console.log(err.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      projectSub.unsubscribe();
    });
  }

  addProject() {
    this.router.navigate(['/admin/projects/add']);
  }

  editProject(id: string) {
    this.router.navigate(['/admin/projects/edit', id]);
  }

  deleteProject(id: string) {
    const confirmed = confirm('Are you sure you want to delete this project?');

    if (!confirmed) return;

    const sub = this.projectService.deleteProject(id).subscribe({
      next: (res) => {
        this.projects.update((items) => items.filter((project) => project._id !== id));

        this.snackBarService.success(res.message);
      },
      error: (err) => {
        this.snackBarService.error(err.error?.message || 'Failed to delete project');
      },
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  viewProject(id: string) {
    this.router.navigate(['/admin/projects', id]);
  }
}
