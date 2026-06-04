import { Component, inject, OnInit, signal } from '@angular/core';
import { SOCIAL_LINKS } from '../../portfolio-data';
import { UploadService } from '../../core/services/upload.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  // private uploadService = inject(UploadService);
  private profileService = inject(ProfileService);

  socialLinks = SOCIAL_LINKS;

  resumeUrl = signal('');
  profileImage = signal('');

  ngOnInit() {
    this.profileService.getResumeUrl().subscribe({
      next: (res) => {
        // console.log('Resume URL:', res.resumeUrl);
        this.resumeUrl.set(res.resumeUrl);
      },
      error: (err) => console.error('Resume fetch failed', err),
    });

    // this.uploadService.getResumeUrl().subscribe({
    //   next: (res) => this.resumeUrl.set(res.resumeUrl),
    //   error: (err) => console.error('Resume fetch failed', err),
    // });

    this.profileService.getProfileImage().subscribe({
      next: (res) => this.profileImage.set(res.imageUrl),
      error: (err) => console.error('Profile image fetch failed', err),
    });
  }
}
