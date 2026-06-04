import { Component, inject, signal } from '@angular/core';
import { UploadService } from '../../core/services/upload.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-admin-resume',
  standalone: true,
  imports: [],
  templateUrl: './admin-resume.html',
  styleUrl: './admin-resume.css',
})
export class AdminResume {
  private profileService = inject(ProfileService);

  resumeUrl = signal('');
  saving = signal(false);
  message = signal('');

  saveResume() {
    if (!this.resumeUrl().trim()) {
      this.message.set('Please paste Google Drive resume link');
      return;
    }

    this.saving.set(true);

    this.profileService.saveResumeUrl(this.resumeUrl()).subscribe({
      next: () => {
        this.message.set('Resume link saved successfully!');
        this.saving.set(false);
        this.resumeUrl.set('');
      },
      error: () => {
        this.message.set('Resume link save failed!');
        this.saving.set(false);
      },
    });
  }
}
