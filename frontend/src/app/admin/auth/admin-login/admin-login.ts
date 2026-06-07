import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  private adminService = inject(AdminService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  login() {
    this.errorMessage.set('');

    if (!this.email() || !this.password()) {
      this.errorMessage.set('Email and password are required');
      return;
    }

    this.isLoading.set(true);

    this.adminService.login(this.email(), this.password()).subscribe({
      next: (res) => {
        this.adminService.saveToken(res.token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Invalid email or password');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
