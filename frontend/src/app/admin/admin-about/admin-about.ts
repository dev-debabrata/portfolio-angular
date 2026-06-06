import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AboutService } from '../../core/services/about.service';
import { FormsModule } from '@angular/forms';
import { SnackBarService } from '../../core/services/snack-bar.service';

@Component({
  selector: 'app-admin-about',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-about.html',
  styleUrl: './admin-about.css',
})
export class AdminAbout implements OnInit {
  private aboutService = inject(AboutService);
  private snackBarService = inject(SnackBarService);
  private destroyRef = inject(DestroyRef);

  saving = signal(false);

  aboutForm = signal({
    description: '',
    email: '',
    location: '',
  });

  ngOnInit() {
    const aboutSub = this.aboutService.getAbout().subscribe({
      next: (res) => {
        this.aboutForm.set({
          description: res.description,
          email: res.email,
          location: res.location,
        });
      },
      error: () => {
        console.log('No about data found');
      },
    });

    this.destroyRef.onDestroy(() => {
      aboutSub.unsubscribe();
    });
  }

  updateField(field: 'description' | 'email' | 'location', value: string) {
    this.aboutForm.update((form) => ({
      ...form,
      [field]: value,
    }));
  }

  saveAbout() {
    const form = this.aboutForm();

    if (!form.description || !form.email || !form.location) {
      this.snackBarService.error('All fields are required');
      return;
    }

    this.saving.set(true);

    const saveAboutSub = this.aboutService.saveAbout(form).subscribe({
      next: (res) => {
        this.snackBarService.success(res.message);
        this.saving.set(false);
      },
      error: (err) => {
        this.snackBarService.error(err.message);
        this.saving.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      saveAboutSub.unsubscribe();
    });
  }

  // saveAbout() {
  //   if (!this.description() || !this.email() || !this.location()) {
  //     this.snacBarService.error('All fields are required');
  //     return;
  //   }

  //   this.saving.set(true);

  //   this.aboutService
  //     .saveAbout({
  //       description: this.description(),
  //       email: this.email(),
  //       location: this.location(),
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.snacBarService.success('About saved successfully!');
  //         this.saving.set(false);
  //       },
  //       error: () => {
  //         this.snacBarService.error('About save failed!');
  //         this.saving.set(false);
  //       },
  //     });
  // }
}
