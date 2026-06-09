import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import {
  LucideAngularModule,
  Sun,
  Moon,
  Menu,
  X,
  Trash2,
  Mail,
  MapPin,
  LogOut,
  Link2,
} from 'lucide-angular';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),

    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),

    importProvidersFrom(
      LucideAngularModule.pick({ Sun, Moon, Menu, X, Trash2, Mail, MapPin, LogOut, Link2 }),
    ),
  ],
};
