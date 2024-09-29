// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
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
