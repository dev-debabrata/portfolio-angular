import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isAdminPage = signal(
    isPlatformBrowser(this.platformId) ? window.location.pathname.startsWith('/admin') : false,
  );

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminPage.set(event.urlAfterRedirects.startsWith('/admin'));
      });
  }
  // private router = inject(Router);

  // isAdminPage = signal(false);

  // constructor() {
  //   this.isAdminPage.set(this.router.url.startsWith('/admin'));

  //   this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe((event: NavigationEnd) => {
  //       this.isAdminPage.set(event.urlAfterRedirects.startsWith('/admin'));
  //     });
  // }
}
