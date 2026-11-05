import { MessageService } from 'primeng/api'
import { Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Password } from 'primeng/password'
import { Card } from 'primeng/card'
import { Button } from 'primeng/button'
import { InputText } from 'primeng/inputtext'
import { AuthService } from '../services/auth-service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, Card, Button, Password, InputText],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  authService = inject(AuthService)
  messageService = inject(MessageService)
  router = inject(Router)
  isLoging = signal<boolean>(true)
  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
  })
  toggleMode() {
    this.isLoging.update((value) => !value)
  }
  title(): string {
    return this.isLoging() ? 'Connexion' : 'Créer un compte'
  }
  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    const { username, password } = this.form.getRawValue()
    if (this.isLoging()) {
      this.login(username, password)
    } else {
      this.register(username, password)
    }
  }
  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Connexion impossible, réessayez!',
        })
      },
    })
  }
  register(username: string, password: string) {
    this.authService.register(username, password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Enregistrement impossible, réessayez!',
        }),
    })
  }
}
