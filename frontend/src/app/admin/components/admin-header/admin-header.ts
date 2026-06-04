import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader implements OnInit {
  private adminService = inject(AdminService);
  private destroyRef = inject(DestroyRef);

  adminName = 'Admin';

  ngOnInit() {
    const sub = this.adminService.getProfile().subscribe({
      next: (res: any) => {
        this.adminName = res.admin?.name || 'Admin';
      },
      error: () => {
        this.adminName = 'Admin';
      },
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
