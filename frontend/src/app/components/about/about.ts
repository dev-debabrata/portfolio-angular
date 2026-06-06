import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AboutService } from '../../core/services/about.service';
import { AboutResponse } from '../../models/about.model';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  private aboutService = inject(AboutService);
  private destroyRef = inject(DestroyRef);

  abouts = signal<AboutResponse>({
    description: '',
    email: '',
    location: '',
  });

  ngOnInit(): void {
    const aboutSub = this.aboutService.getAbout().subscribe({
      next: (res) => {
        this.abouts.set(res);
      },

      error: (err) => {
        console.error('About fetch failed', err);
      },
    });

    this.destroyRef.onDestroy(() => {
      aboutSub.unsubscribe();
    });
  }
}
