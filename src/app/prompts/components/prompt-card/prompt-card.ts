import { Component, computed, inject, input, linkedSignal, output, signal } from '@angular/core'
import { Prompt } from '../../models/prompt.model'
import { Button } from 'primeng/button'
import { Tag } from 'primeng/tag'
import { Card } from 'primeng/card'
import { PromptService } from '../../services/prompt-service'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../../auth/services/auth-service'
import { finalize, from } from 'rxjs'
import { MessageService } from 'primeng/api'
import { Textarea } from 'primeng/textarea'

@Component({
  selector: 'app-prompt-card',
  imports: [Button, Tag, Card, RouterLink, Textarea],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  delete() {
    this.promptService.delete(this.prompt().id).subscribe(() => {
      this.deleted.emit(this.prompt().id)
    })
  }
  authService = inject(AuthService)
  messageService = inject(MessageService)
  router = inject(Router)
  promptService = inject(PromptService)
  prompt = input.required<Prompt>()
  score = linkedSignal(() => this.prompt().score)
  deleted = output<number>()
  voting = signal<boolean>(false)
  userVote = linkedSignal(() => (this.authService.currentUser() ? this.prompt().userVote : null))
  canEdit = computed(() => {
    const currentUser = this.authService.currentUser
    return currentUser() && this.prompt().author.id === currentUser()?.id
  })
  copyToClipboard() {
    from(navigator.clipboard.writeText(this.prompt().content)).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copié',
        detail: 'Prompt copié dans le presse papier',
      })
    })
  }
  upvote() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth'])
      return
    }
    this.voting.set(true)

    this.promptService
      .upvote(this.prompt().id)
      .pipe(finalize(() => this.voting.set(false)))
      .subscribe((updatedPrompt) => {
        this.score.set(updatedPrompt.score)
        this.userVote.set(updatedPrompt.userVote)
      })
  }
  downvote() {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth'])
      return
    }
    this.voting.set(true)
    this.promptService
      .downvote(this.prompt().id)
      .pipe(finalize(() => this.voting.set(false)))
      .subscribe((updatedPrompt) => {
        this.score.set(updatedPrompt.score)
        this.userVote.set(updatedPrompt.userVote)
      })
  }
}
