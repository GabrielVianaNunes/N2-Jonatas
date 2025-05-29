import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '@models/emprestimo.model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private readonly apiUrl = 'http://localhost:8085/api/emprestimos';

  constructor(private http: HttpClient) {}

  getEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  devolverEmprestimo(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/devolver`, {});
  }
}
