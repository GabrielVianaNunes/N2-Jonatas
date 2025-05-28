import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '@services/usuario.service';
import { MessageService } from 'primeng/api';
import { Usuario } from '@models/usuario.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ProgressBarModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  form: FormGroup;
  isEdicao = false;
  usuarioId: number | null = null;
  loading = false;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private messageService = inject(MessageService);

  constructor() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      matricula: ['', Validators.required],
      curso: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdicao = true;
        this.usuarioId = +params['id'];
        this.carregarUsuario(this.usuarioId);
      }
    });
  }

  carregarUsuario(id: number): void {
    this.loading = true;
    this.usuarioService.getUsuarioPorId(id).subscribe({
      next: (usuario: Usuario) => {
        this.form.patchValue(usuario);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar usuário.'
        });
        this.loading = false;
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      return;
    }

    const usuario: Usuario = this.form.value;
    this.loading = true;

    if (this.isEdicao && this.usuarioId) {
      this.usuarioService.atualizarUsuario(this.usuarioId, usuario).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado!' });
          this.router.navigate(['/usuarios']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar usuário.' });
          this.loading = false;
        }
      });
    } else {
      this.usuarioService.criarUsuario(usuario).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado!' });
          this.router.navigate(['/usuarios']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar usuário.' });
          this.loading = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }

  get nome() { return this.form.get('nome'); }
  get matricula() { return this.form.get('matricula'); }
  get curso() { return this.form.get('curso'); }
}
