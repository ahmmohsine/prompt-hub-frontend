import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'prompts',
    pathMatch: 'full',
  },
  {
    path: 'prompts',
    loadChildren: () => import('./prompts/components/prompt.routes').then((m) => m.PROMPTS_ROUTES),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth-form/auth-form').then((m) => m.AuthForm),
  },
]
