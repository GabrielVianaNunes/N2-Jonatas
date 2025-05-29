import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprestimoService } from '@services/emprestimo.service';
import { Emprestimo } from '@models/emprestimo.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-emprestimo-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './emprestimo-list.component.html',
  styleUrls: ['./emprestimo-list.component.css']
})
export class EmprestimoListComponent implements OnInit {
  emprestimos: Emprestimo[] = [];
  loading = true;

  private emprestimoService = inject(EmprestimoService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.carregarEmprestimos();
  }

  carregarEmprestimos(): void {
    this.loading = true;
    this.emprestimoService.getEmprestimos().subscribe({
      next: (dados: Emprestimo[]) => {
        this.emprestimos = dados;
        this.loading = false;
      },
      error: (error: unknown) => {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar empréstimos: ' + msg
        });
        this.loading = false;
      }
    });
  }

  devolverEmprestimo(id: number): void {
    this.emprestimoService.devolverEmprestimo(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Livro devolvido com sucesso!'
        });
        this.carregarEmprestimos();
      },
      error: (error: unknown) => {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao devolver livro: ' + msg
        });
      }
    });
  }
}
