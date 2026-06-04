import { Component, inject, signal } from '@angular/core';
import { AboutService } from '../../core/services/about.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-about',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-about.html',
  styleUrl: './admin-about.css',
})
export class AdminAbout {
  private aboutService = inject(AboutService);

  description = signal('');
  email = signal('');
  location = signal('');
  saving = signal(false);
  message = signal('');

  ngOnInit() {
    this.aboutService.getAbout().subscribe({
      next: (res) => {
        this.description.set(res.description);
        this.email.set(res.email);
        this.location.set(res.location);
      },
      error: () => {
        console.log('No about data found');
      },
    });
  }

  saveAbout() {
    if (!this.description() || !this.email() || !this.location()) {
      this.message.set('All fields are required');
      return;
    }

    this.saving.set(true);

    this.aboutService
      .saveAbout({
        description: this.description(),
        email: this.email(),
        location: this.location(),
      })
      .subscribe({
        next: () => {
          this.message.set('About saved successfully!');
          this.saving.set(false);
        },
        error: () => {
          this.message.set('About save failed!');
          this.saving.set(false);
        },
      });
  }
}
