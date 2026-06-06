import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  private adminService = inject(AdminService);
  private router = inject(Router);
  private snackbarService = inject(SnackBarService);

  logout() {
    this.adminService.logout();
    this.router.navigate(['/admin/login']);
    this.snackbarService.success('Admin Logout successful.');
  }
}
