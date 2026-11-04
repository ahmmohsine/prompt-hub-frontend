import { PromptService } from './../../services/prompt-service'
import { Prompt } from './../../models/prompt.model'
import { Component, effect, inject, input } from '@angular/core'
import { Card } from 'primeng/card'
import { Select } from 'primeng/select'
import { CategoryService } from '../../services/category-service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Button } from 'primeng/button'
import { Category } from '../../models/category.model'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router, RouterLink } from '@angular/router'
import { InputText } from 'primeng/inputtext'
@Component({
  selector: 'app-prompt-form',
  imports: [InputText, Card, Select, ReactiveFormsModule, Button, RouterLink],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  router = inject(Router)
  categoryService = inject(CategoryService)
  categories = toSignal<Category[]>(this.categoryService.getCategories())
  //categories$ = this.categoryService.getCategories();
  promptService = inject(PromptService)
  promptId = input<number>()
  constructor() {
    effect(() => {
      const id = this.promptId()
      if (id) {
        this.promptService.get(id).subscribe((p) => {
          this.form.patchValue({
            title: p.title,
            categoryId: p.category.id,
            content: p.content,
          })
        })
      }
    })
  }
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)],
      nonNullable: true,
    }),
    content: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    categoryId: new FormControl(-1, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
  })
  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    const prompt = this.form.getRawValue()
    const id = this.promptId()
    if (id) {
      console.log('derniere etape')
      this.promptService
        .update(id, { title: prompt.title, content: prompt.content, categoryId: prompt.categoryId })
        .subscribe(() => this.router.navigate(['/']))
    } else {
      this.promptService.create(prompt).subscribe(() => this.router.navigate(['/']))
    }
  }
  delete() {
    console.log('y a problem')
    this.promptService.delete(this.promptId()!).subscribe(() => this.router.navigate(['/']))
  }
}
