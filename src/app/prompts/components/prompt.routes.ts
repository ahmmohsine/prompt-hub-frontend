import { Routes } from '@angular/router'
import { authGuard } from '../../auth/guards/auth-guard'
export const PROMPTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./prompt-list/prompt-list').then((m) => m.PromptList),
  },
  {
    path: 'create',
    loadComponent: () => import('./prompt-form/prompt-form').then((m) => m.PromptForm),
    canActivate: [authGuard],
  },
  {
    path: ':promptId/edit',
    loadComponent: () => import('./prompt-form/prompt-form').then((m) => m.PromptForm),
    canActivate: [authGuard],
  },
]
