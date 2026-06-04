import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { UploadService } from '../../core/services/upload.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
})
export class AdminProfile {
  private profileService = inject(ProfileService);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile = signal<File | null>(null);
  uploading = signal(false);
  message = signal('');
  previewUrl = signal<string | null>(null);

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      const file = input.files[0];

      this.selectedFile.set(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        this.previewUrl.set(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  uploadProfileImage() {
    const file = this.selectedFile();

    if (!file) return;

    this.uploading.set(true);

    this.profileService.uploadProfileImage(file).subscribe({
      next: () => {
        this.message.set('Profile image uploaded successfully!');
        this.uploading.set(false);

        this.selectedFile.set(null);
        this.previewUrl.set(null);

        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: () => {
        this.message.set('Upload failed!');
        this.uploading.set(false);
      },
    });
  }

  // private uploadService = inject(UploadService);

  // selectedFile = signal<File | null>(null);
  // uploading = signal(false);
  // message = signal('');
  // previewUrl = signal<string | null>(null);
  // onFileSelect(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files?.length) {
  //     const file = input.files[0];
  //     this.selectedFile.set(file);

  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.previewUrl.set(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // uploadProfileImage() {
  //   if (!this.selectedFile()) return;

  //   this.uploading.set(true);
  //   this.uploadService.uploadProfileImage(this.selectedFile()!).subscribe({
  //     next: () => {
  //       this.message.set('Profile image uploaded successfully!');
  //       this.uploading.set(false);
  //       this.selectedFile.set(null);
  //     },
  //     error: () => {
  //       this.message.set('Upload failed!');
  //       this.uploading.set(false);
  //     },
  //   });
  // }
}
