import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '@services/usuario.service';
import { Usuario } from '@models/usuario.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule
  ],
  providers: [ConfirmationService],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = true;

  private usuarioService = inject(UsuarioService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (error: unknown) => {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar usuários: ' + msg
        });
        this.loading = false;
      }
    });
  }

  confirmarExclusao(usuario: Usuario): void {
    this.confirmationService.confirm({
      message: `Deseja excluir o usuário "${usuario.nome}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.excluirUsuario(usuario.id!)
    });
  }

  excluirUsuario(id: number): void {
    this.usuarioService.excluirUsuario(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário excluído com sucesso!'
        });
        this.carregarUsuarios();
      },
      error: (error: unknown) => {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir usuário: ' + msg
        });
      }
    });
  }
}
