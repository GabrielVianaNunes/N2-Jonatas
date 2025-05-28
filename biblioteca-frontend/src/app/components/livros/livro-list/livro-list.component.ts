import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LivroService } from '@services/livro.service';
import { Livro } from '@models/livro.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit {
  livros: Livro[] = [];
  loading = true;

  private livroService = inject(LivroService) as LivroService;
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.loading = true;
    this.livroService.getLivros().subscribe({
      next: (data: Livro[]) => {
        this.livros = data;
        this.loading = false;
      },
      error: (error: unknown) => {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar livros: ' + msg
        });
        this.loading = false;
      }
    });
  }

  confirmarExclusao(livro: Livro): void {
    this.confirmationService.confirm({
      message: `Deseja excluir o livro "${livro.titulo}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.excluirLivro(livro.id!)
    });
  }

  excluirLivro(id: number): void {
    this.livroService.excluirLivro(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Livro excluído com sucesso!'
        });
        this.carregarLivros();
      },
      error: (error: unknown) => {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir livro: ' + msg
        });
      }
    });
  }
}
