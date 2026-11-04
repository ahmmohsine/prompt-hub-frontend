import { Component, computed, inject, input, InputSignal } from '@angular/core'
import { Prompt } from '../../models/prompt.model'
import { Button } from 'primeng/button'
import { Tag } from 'primeng/tag'
import { Card } from 'primeng/card'
import { PromptService } from '../../services/prompt-service'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../auth/services/auth-service'

@Component({
  selector: 'app-prompt-card',
  imports: [Button, Tag, Card, RouterLink],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  authService = inject(AuthService)
  promptService = inject(PromptService)
  prompt = input.required<Prompt>()
  canEdit = computed(() => {
    const currentUser = this.authService.currentUser;
    return currentUser() && this.prompt().author.id === currentUser()?.id
  })
  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content)
  }
}
