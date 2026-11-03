import { Component, input, InputSignal } from '@angular/core'
import { Prompt } from '../prompt.model';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-prompt-card',
  imports: [Button],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
deletePrompt(arg0: InputSignal<Prompt>) {
throw new Error('Method not implemented.');
}
editPrompt(arg0: InputSignal<Prompt>) {
throw new Error('Method not implemented.');
}
  prompt = input.required<Prompt>();
  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content);
  }
}
