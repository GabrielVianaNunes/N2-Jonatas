import { Livro } from './livro.model';
import { Usuario } from './usuario.model';

export interface Emprestimo {
  id?: number;
  livro: Livro;
  usuario: Usuario;
  dataEmprestimo: string;  // ou Date, dependendo do backend
  dataDevolucaoPrevista: string;  // ou Date
  status: 'EMPRESTADO' | 'DEVOLVIDO';
}
