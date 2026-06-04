import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { NAVBAR_MENU } from '../../portfolio-data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
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

    if (item.type === 'route') {
      this.activeSection = item.id;
      this.router.navigate([item.id]);
      return;
    }

    this.activeSection = item.id;

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.getElementById(item.id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  // scrollToSection(id: string) {
  //   this.activeSection = id;
  //   this.isOpen = false;

  //   if (!isPlatformBrowser(this.platformId)) {
  //     return;
  //   }

  //   document.getElementById(id)?.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //   });
  // }

  // toggleTheme() {
  //   this.isDark = !this.isDark;

  //   if (this.isDark) {
  //     document.body.classList.add('dark-theme');
  //   } else {
  //     document.body.classList.remove('dark-theme');
  //   }
  // }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isDark = !this.isDark;

    document.documentElement.classList.toggle('dark-theme', this.isDark);
  }
}
