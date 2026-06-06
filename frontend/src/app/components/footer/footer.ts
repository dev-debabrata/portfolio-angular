import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FOOTER_MENU, SOCIAL_LINKS } from '../../portfolio-data';

import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  currentYear = new Date().getFullYear();

  footerMenu = FOOTER_MENU;
  socialLinks = SOCIAL_LINKS;

  handleNavigation(item: any) {
    if (item.type === 'route') {
      if (item.id === 'home') {
        this.router.navigate(['/']);
        return;
      }

      this.router.navigate([`/${item.id}`]);
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    });

    // document.getElementById(item.id)?.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });
  }
}
