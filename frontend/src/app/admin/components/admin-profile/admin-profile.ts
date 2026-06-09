import {
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { ProfileForm } from '../../../models/profile.model';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
})
export class AdminProfile {
  private profileService = inject(ProfileService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile = signal<File | null>(null);
  uploading = signal(false);
  savingContent = signal(false);
  previewUrl = signal<string | null>(null);
  originalProfileForm = signal<ProfileForm | null>(null);

  resumeUrl = signal('');
  saving = signal(false);
  message = signal('');

  profileForm = signal<ProfileForm>({
    greeting: '',
    firstName: '',
    lastName: '',
    role: '',
    profileDescription: '',
  });

  isProfileChanged = computed(() => {
    const original = this.originalProfileForm();
    const current = this.profileForm();

    if (!original) return false;

    return JSON.stringify(original) !== JSON.stringify(current);
  });

  ngOnInit() {
    const profileSub = this.profileService.getProfile().subscribe({
      next: (res) => {
        const formData = {
          greeting: res.greeting,
          firstName: res.firstName,
          lastName: res.lastName,
          role: res.role,
          profileDescription: res.profileDescription,
        };

        this.profileForm.set(formData);
        this.originalProfileForm.set(formData);
      },
      // next: (res) => {
      //   this.profileForm.set({
      //     greeting: res.greeting,
      //     firstName: res.firstName,
      //     lastName: res.lastName,
      //     role: res.role,
      //     profileDescription: res.profileDescription,
      //   });
      // },
      error: () => {
        console.log('No profile data found');
      },
    });

    this.destroyRef.onDestroy(() => {
      profileSub.unsubscribe();
    });
  }

  updateField(field: keyof ProfileForm, value: string) {
    this.profileForm.update((form) => ({
      ...form,
      [field]: value,
    }));
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.selectedFile.set(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl.set(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  }

  uploadProfileImage() {
    const file = this.selectedFile();
    if (!file) return;

    this.uploading.set(true);

    const profileImgSub = this.profileService.uploadProfileImage(file).subscribe({
      next: () => {
        this.snackBarService.success('Profile image uploaded successfully!');
        this.uploading.set(false);
        this.selectedFile.set(null);
        this.previewUrl.set(null);

        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: () => {
        this.snackBarService.error('Upload failed!');
        this.uploading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      profileImgSub.unsubscribe();
    });
  }

  saveResume() {
    if (!this.resumeUrl().trim()) {
      this.snackBarService.error('Please paste Google Drive resume link');
      return;
    }

    this.saving.set(true);

    const profileResumeSub = this.profileService.saveResumeUrl(this.resumeUrl()).subscribe({
      next: () => {
        this.snackBarService.success('Resume link saved successfully!');
        this.saving.set(false);
        this.resumeUrl.set('');
      },
      error: () => {
        this.snackBarService.error('Resume link save failed!');
        this.saving.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      profileResumeSub.unsubscribe();
    });
  }

  saveProfileContent() {
    const form = this.profileForm();

    if (!form.profileDescription.trim()) {
      this.snackBarService.error('Description is required!');
      return;
    }

    this.savingContent.set(true);

    const profileContentSub = this.profileService.updateProfileContent(form).subscribe({
      next: () => {
        this.snackBarService.success('Profile content updated successfully!');
        this.savingContent.set(false);
        this.originalProfileForm.set(this.profileForm());
      },
      error: () => {
        this.snackBarService.error('Profile content update failed!');
        this.savingContent.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      profileContentSub.unsubscribe();
    });
  }
}
