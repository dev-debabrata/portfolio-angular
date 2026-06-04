import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem('adminToken');

  // For login page
  if (state.url === '/admin/login') {
    return token ? router.createUrlTree(['/admin/dashboard']) : true;
  }

  // For protected admin pages
  return token ? true : router.createUrlTree(['/admin/login']);
};
