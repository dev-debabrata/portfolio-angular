import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';

import { EducationForm, EducationResponse } from '../../../../models/education.model';
import { EducationService } from '../../../../core/services/education.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';

@Component({
  selector: 'app-admin-education-form',
  standalone: true,
  imports: [],
  templateUrl: './admin-education-form.html',
  styleUrl: './admin-education-form.css',
})
export class AdminEducationForm {
  editData = input<EducationResponse | null>(null);
  closeForm = output<EducationResponse>();

  private EducationService = inject(EducationService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);

  educationForm = signal<EducationForm>({
    school: '',
    degree: '',
    years: '',
  });

  constructor() {
    effect(() => {
      const edu = this.editData();

      if (edu) {
        this.educationForm.set({
          school: edu.school,
          degree: edu.degree,
          years: edu.years,
        });
      } else {
        this.educationForm.set({
          school: '',
          degree: '',
          years: '',
        });
      }
    });
  }

  updateField(field: keyof EducationForm, value: string) {
    this.educationForm.update((form) => ({
      ...form,
      [field]: value,
    }));
  }

  submitEducation() {
    const form = this.educationForm();

    const isSchoolEmpty = !form.school.trim();
    const isDegreeEmpty = !form.degree.trim();
    const isYearsEmpty = !form.years.trim();

    if (isSchoolEmpty && isDegreeEmpty && isYearsEmpty) {
      this.snackBarService.error('All fields are required');
      return;
    }

    if (isSchoolEmpty) {
      this.snackBarService.error('School/College name is required');
      return;
    }

    if (isDegreeEmpty) {
      this.snackBarService.error('Depertment is required');
      return;
    }

    if (isYearsEmpty) {
      this.snackBarService.error('Year is required');
      return;
    }

    this.loading.set(true);

    const editEducation = this.editData();

    const educationUpdate = editEducation?._id
      ? this.EducationService.updateEducation(editEducation._id, form)
      : this.EducationService.createEducation(form);

    const educationSub = educationUpdate.subscribe({
      next: (res) => {
        this.snackBarService.success(res.message);
        this.loading.set(false);
        this.closeForm.emit(res.education);
      },

      error: (err) => {
        this.snackBarService.error(err.error?.message || 'Education save failed');
        this.loading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      educationSub.unsubscribe();
    });
  }
}
