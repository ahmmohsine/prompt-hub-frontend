import { CurrentUser } from './../models/CurrentUserModel'
import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { catchError, of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient)
  baseUrl = environment.apiUrl + '/auth'
  currentUser = signal<CurrentUser | undefined>(undefined)

  login(username: string, password: string) {
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/login`, { username, password })
      .pipe(tap((currentUser) => this.currentUser.set(currentUser)))
  }
  me() {
    return this.httpClient.get<CurrentUser>(`${this.baseUrl}/me`).pipe(
      tap((currentUser) => this.currentUser.set(currentUser)),
      catchError(() => of(undefined)),
    )
  }
  register(username: string, password: string) {
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/register`, { username, password })
      .pipe(tap((currentUser) => this.currentUser.set(currentUser)))
  }
   logout() {
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/logout`, {  })
      .pipe(tap((currentUser) => this.currentUser.set(undefined)))
  }
}
