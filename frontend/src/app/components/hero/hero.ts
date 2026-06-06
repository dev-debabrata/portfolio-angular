import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';

import { SOCIAL_LINKS } from '../../portfolio-data';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  socialLinks = SOCIAL_LINKS;

  heroContent = signal({
    imageUrl: '',
    greeting: '',
    firstName: '',
    lastName: '',
    role: '',
    profileDescription: '',
  });

  resumeUrl = signal('');

  ngOnInit(): void {
    const profileSub = this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.heroContent.set({
          imageUrl: profile.imageUrl,
          greeting: profile.greeting,
          firstName: profile.firstName,
          lastName: profile.lastName,
          role: profile.role,
          profileDescription: profile.profileDescription,
        });
      },
      error: (err) => console.error('Profile fetch failed', err),
    });

    const resumeSub = this.profileService.getResumeUrl().subscribe({
      next: (resume) => {
        this.resumeUrl.set(resume.resumeUrl);
      },
      error: () => {
        this.resumeUrl.set('');
      },
    });

    this.destroyRef.onDestroy(() => {
      profileSub.unsubscribe();
      resumeSub.unsubscribe();
    });
  }

  // ngOnInit(): void {
  //   const sub = forkJoin({
  //     profile: this.profileService.getProfile(),
  //     resume: this.profileService.getResumeUrl(),
  //   }).subscribe({
  //     next: ({ profile, resume }) => {
  //       this.resumeUrl.set(resume.resumeUrl);

  //       this.heroContent.set({
  //         imageUrl: profile.imageUrl,
  //         greeting: profile.greeting,
  //         firstName: profile.firstName,
  //         lastName: profile.lastName,
  //         role: profile.role,
  //         profileDescription: profile.profileDescription,
  //       });
  //     },

  //     error: (err) => {
  //       console.error('Hero data fetch failed', err);
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     sub.unsubscribe();
  //   });
  // }
}
