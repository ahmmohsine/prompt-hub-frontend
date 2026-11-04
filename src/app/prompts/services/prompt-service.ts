import { inject, Injectable } from '@angular/core'
import { Prompt } from '../models/prompt.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  // update(id: number, prompt: Prompt) {
  //   return this.httpClient.put<Prompt>(this.baseUrl + '/' + id, prompt)
  // }
  update(id: number, prompt: { title: string; content: string; categoryId: number }) {
    return this.httpClient.put<Prompt>(`${this.baseUrl}/${id}`, prompt)
  }

  httpClient = inject(HttpClient)
  baseUrl = environment.apiUrl + '/prompts'

  getAll() {
    return this.httpClient.get<Prompt[]>(this.baseUrl)
  }
  get(id: number) {
    return this.httpClient.get<Prompt>(`${this.baseUrl}/${id}`)
  }

  create(prompt: { title: string; content: string; categoryId: number }) {
    return this.httpClient.post<Prompt>(this.baseUrl, prompt)
  }
  delete(id: number) {
    return this.httpClient.delete<Prompt>(`${this.baseUrl}/${id}`)
  }
}
