import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './auth/interceptors/auth-interceptor'
import { AuthService } from './auth/services/auth-service'
const promptPrest = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
})
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideAppInitializer(() => inject(AuthService).me()),
    providePrimeNG({
      theme: {
        preset: promptPrest,
        options: {
          darkModeSelector: '.app-dark',
          lightModeSelector: '.app-light',
        },
      },
    }),
  ],
}
