import { Component, inject, signal } from '@angular/core'
import { Prompt } from '../../models/prompt.model'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../../services/prompt-service'
import { finalize } from 'rxjs'
import { Skeleton } from 'primeng/skeleton'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard, Skeleton],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService = inject(PromptService)
  prompts = signal<Prompt[]>([])
  isLoading = signal(true)
  constructor() {
    this.promptService
      .getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((prompts) => this.prompts.set(prompts))
  }

  onDeleted(id: number) {
    this.prompts.update((prompts) => prompts.filter((p) => p.id !== id))
  }
}
