import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { forkJoin } from 'rxjs';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader implements OnInit {
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  adminName = signal('');
  imageUrl = signal('');

  ngOnInit(): void {
    const profileSub = this.profileService.getProfile().subscribe({
      next: (profile) => {
        const fullName = `${profile.firstName} ${profile.lastName}`;

        this.adminName.set(fullName);
        this.imageUrl.set(profile.imageUrl || '');
      },
      error: () => {
        this.adminName.set('');
        this.imageUrl.set('');
      },
    });

    this.destroyRef.onDestroy(() => {
      profileSub.unsubscribe();
    });
  }
  // private adminService = inject(AdminService);
  // private profileService = inject(ProfileService);
  // private destroyRef = inject(DestroyRef);

  // adminName = signal('Admin');
  // avatarUrl = signal('https://ui-avatars.com/api/?name=Admin');

  // ngOnInit(): void {
  //   const profileSub = forkJoin({
  //     profileName: this.adminService.getProfile(),
  //     profileImage: this.profileService.getProfile(),
  //   }).subscribe({
  //     next: ({ profileName, profileImage }) => {
  //       this.adminName.set((profileName as any).admin?.name || 'Admin');

  //       if (profileImage.imageUrl) {
  //         this.avatarUrl.set(profileImage.imageUrl);
  //       } else {
  //         this.avatarUrl.set(
  //           `https://ui-avatars.com/api/?name=${encodeURIComponent(this.adminName())}`,
  //         );
  //       }
  //     },
  //     error: () => {
  //       this.adminName.set('Admin');
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     profileSub.unsubscribe();
  //   });
  // }
}
