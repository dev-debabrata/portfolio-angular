import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';

import { ProjectService } from '../../../../core/services/project.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { ProjectResponse } from '../../../../models/project.model';

@Component({
  selector: 'app-admin-project-detail',
  standalone: true,
  imports: [],
  templateUrl: './admin-project-detail.html',
  styleUrl: './admin-project-detail.css',
})
export class AdminProjectDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  project = signal<ProjectResponse | null>(null);
  isLoading = signal(false);
  imagePopup = signal(false);

  ngOnInit(): void {
    const projectSub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const projectId = params.get('id');
          if (!projectId) return EMPTY;

          this.isLoading.set(true);
          this.project.set(null);

          return this.projectService.getProjectById(projectId);
        }),
      )
      .subscribe({
        next: (res) => {
          this.project.set(res);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.snackBarService.error(err.error?.message || 'Project not found');
        },
      });

    this.destroyRef.onDestroy(() => {
      projectSub.unsubscribe();
    });
  }

  // ngOnInit(): void {
  //   const routeSub = this.route.paramMap.subscribe((params) => {
  //     const projectId = params.get('id');

  //     if (!projectId) {
  //       return;
  //     }

  //     this.isLoading.set(true);
  //     this.project.set(null);

  //     const projectSub = this.projectService.getProjectById(projectId).subscribe({
  //       next: (res) => {
  //         this.project.set(res);
  //         this.isLoading.set(false);
  //       },
  //       error: (err) => {
  //         this.snackBarService.error(err.error?.message || 'Project not found ');
  //         console.log(err);
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
}
