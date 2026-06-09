import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { EducationService } from '../../../../core/services/education.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { EducationResponse } from '../../../../models/education.model';
import { LucideAngularModule } from 'lucide-angular';
import { AdminEducationForm } from '../admin-education-form/admin-education-form';

@Component({
  selector: 'app-admin-education-list',
  standalone: true,
  imports: [LucideAngularModule, AdminEducationForm],
  templateUrl: './admin-education-list.html',
  styleUrl: './admin-education-list.css',
})
export class AdminEducationList implements OnInit {
  private educationService = inject(EducationService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  educations = signal<EducationResponse[]>([]);
  editingEducation = signal<EducationResponse | null>(null);
  showForm = signal(false);

  ngOnInit(): void {
    const educationSub = this.educationService.getEducation().subscribe({
      next: (res) => {
        this.educations.set(res);
        console.log(res);
      },

      error: (err) => {
        console.log(err.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      educationSub.unsubscribe();
    });
  }

  deleteEducation(id: string) {
    const confirmed = confirm('Are you sure delete this Education');

    if (!confirmed) {
      return;
    }

    const eduSub = this.educationService.deleteEducation(id).subscribe({
      next: (res) => {
        this.educations.update((educations) =>
          educations.filter((education) => education._id !== id),
        );
        this.snackBarService.success(res.message);
      },

      error: (err) => {
        this.snackBarService.error(err.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      eduSub.unsubscribe();
    });
  }

  openForm(education?: EducationResponse) {
    this.editingEducation.set(education || null);
    this.showForm.set(true);
  }

  closeForm(saveEducation?: EducationResponse) {
    this.showForm.set(false);

    if (!saveEducation) {
      this.editingEducation.set(null);
      return;
    }

    if (this.editingEducation()) {
      this.educations.update((items) =>
        items.map((item) => (item._id === saveEducation._id ? saveEducation : item)),
      );
    } else {
      this.educations.update((items) => [saveEducation, ...items]);
    }

    this.editingEducation.set(null);
  }
}
