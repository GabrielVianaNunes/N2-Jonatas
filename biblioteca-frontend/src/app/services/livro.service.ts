import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private apiUrl = 'http://localhost:8085/api/livros';

  constructor(private http: HttpClient) {}

  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  getLivroPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  criarLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  atualizarLivro(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
  }

  excluirLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
