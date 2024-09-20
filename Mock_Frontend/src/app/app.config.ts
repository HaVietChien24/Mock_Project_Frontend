// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { tokenInterceptor } from '../api/interceptor/token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    // provideHttpClient(withInterceptors([tokenInterceptor])),
    provideHttpClient(withFetch()),
    provideToastr({
      timeOut: 2500,
      positionClass: 'toast-top-right',
      easeTime: 300,
      closeButton: true,
      progressBar: true,
      tapToDismiss: true,
      preventDuplicates: true,
    }),
    provideAnimations(),
  ],
};
