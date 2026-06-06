import { Component, EventEmitter, inject, Output, signal } from '@angular/core';

import { SkillsService } from '../../../core/services/skills.service';
import { SkillResponse } from '../../../models/skills.model';
import { SnackBarService } from '../../../core/services/snack-bar.service';

@Component({
  selector: 'app-admin-skill-form',
  standalone: true,
  imports: [],
  templateUrl: './admin-skill-form.html',
  styleUrl: './admin-skill-form.css',
})
export class AdminSkillForm {
  @Output() closeForm = new EventEmitter<SkillResponse>();

  private skillsService = inject(SkillsService);
  private snackBarService = inject(SnackBarService);

  selectedImage = signal<File | null>(null);
  imagePreview = signal<string>('');
  loading = signal(false);

  skillForm = signal({
    name: '',
    websiteUrl: '',
    category: 'Frontend',
  });

  updateField(field: string, value: string) {
    this.skillForm.update((form) => ({
      ...form,
      [field]: value,
    }));
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedImage.set(file);

    this.imagePreview.set(URL.createObjectURL(file));
  }

  submitSkill() {
    const form = this.skillForm();

    if (!form.name) {
      this.snackBarService.error('Skill name is required');
      return;
    }

    if (!this.selectedImage()) {
      this.snackBarService.error('Skill image is required');
      return;
    }

    // if (!form.name || !this.selectedImage()) {
    //   this.snackBarService.error('Skill name and image are required');
    //   // this.message.set('Skill name and image are required');
    //   return;
    // }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('websiteUrl', form.websiteUrl);
    formData.append('category', form.category);
    formData.append('image', this.selectedImage()!);

    this.loading.set(true);

    this.skillsService.createSkill(formData).subscribe({
      next: (res) => {
        this.snackBarService.success(res.message);
        this.loading.set(false);
        this.closeForm.emit(res.skill);
      },
      error: (err) => {
        this.snackBarService.error(err.error?.message || 'Skill create failed');

        this.loading.set(false);
      },
    });
  }
}
