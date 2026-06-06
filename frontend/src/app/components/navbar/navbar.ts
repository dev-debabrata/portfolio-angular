import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { NAVBAR_MENU } from '../../portfolio-data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isScrolled = false;
  isOpen = false;
  isDark = false;
  activeSection = 'home';

  navbarMenu = NAVBAR_MENU;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.body.classList.remove('dark-theme');
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  handleNavigation(item: any) {
    this.isOpen = false;
    this.activeSection = item.id;

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
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isDark = !this.isDark;

    document.documentElement.classList.toggle('dark-theme', this.isDark);
  }
}
