import { Component, effect, inject, signal } from '@angular/core'
import { Button } from 'primeng/button'
import { NgOptimizedImage } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../auth/services/auth-service'
import { TitleCasePipe } from '@angular/common'

@Component({
  selector: 'app-navbar',
  imports: [Button, NgOptimizedImage, RouterLink, TitleCasePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly DARK_MODE_KEY = 'dark-mode'
  isDark = signal<boolean>(localStorage.getItem(this.DARK_MODE_KEY) === 'true')
  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDark())
      localStorage.setItem(this.DARK_MODE_KEY, String(this.isDark()))
    })
  }
  authService = inject(AuthService)
  router = inject(Router)
  toggleDarkMode() {
    this.isDark.update((value) => !value)
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}
