import { Routes } from '@angular/router';
import { LivroListComponent } from './components/livros/livro-list/livro-list.component';
import { LivroFormComponent } from './components/livros/livro-form/livro-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'livros', component: LivroListComponent },
  { path: 'livros/novo', component: LivroFormComponent },
  { path: 'livros/editar/:id', component: LivroFormComponent },
  { path: '**', redirectTo: 'livros' }
];
