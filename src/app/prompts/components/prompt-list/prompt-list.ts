import { Component, inject, signal } from '@angular/core'
import { Prompt } from '../../models/prompt.model'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../../services/prompt-service'
import { AsyncPipe } from '@angular/common'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard, AsyncPipe],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService = inject(PromptService)
  prompts$ = this.promptService.getAll()
  //prompts_ = toSignal(this.promptService.getPrompts(), { initialValue: [] });
}
