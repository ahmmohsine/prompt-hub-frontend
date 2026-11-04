import { authInterceptor } from './../auth/interceptors/auth-interceptor';
import { Component, inject, signal } from '@angular/core'
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
  
  isDark = signal<boolean>(false)
  authService = inject(AuthService)
  router = inject(Router)
  toggleDarkMode() {
    this.isDark.update((value) => !value)
    document.documentElement.classList.toggle('app-dark', this.isDark())
  }
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/']);
    });
  }
}
