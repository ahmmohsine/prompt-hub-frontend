export const PROMPTS_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./prompt-list/prompt-list').then((m) => m.PromptList),
  },
  {
    path: 'create',
    loadComponent: () => import('./prompt-form/prompt-form').then((m) => m.PromptForm),
  },
  {
    path: ':promptId/edit',
    loadComponent: () => import('./prompt-form/prompt-form').then((m) => m.PromptForm),
  },
]
