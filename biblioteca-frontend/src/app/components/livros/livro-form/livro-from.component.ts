import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '@services/livro.service';
import { MessageService } from 'primeng/api';
import { Livro } from '@models/livro.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ProgressBarModule
  ],
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {
  form: FormGroup;
  isEdicao = false;
  livroId: number | null = null;
  loading = false;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livroService = inject(LivroService);
  private messageService = inject(MessageService);

  constructor() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', Validators.required],
      editora: ['', Validators.required],
      anoPublicacao: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdicao = true;
        this.livroId = +params['id'];
        this.carregarLivro(this.livroId);
      }
    });
  }

  carregarLivro(id: number): void {
    this.loading = true;
    this.livroService.getLivroPorId(id).subscribe({
      next: (livro: Livro) => {
        this.form.patchValue(livro);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar livro.'
        });
        this.loading = false;
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => control.markAsTouched());
      return;
    }

    const livro: Livro = this.form.value;
    this.loading = true;

    if (this.isEdicao && this.livroId) {
      this.livroService.atualizarLivro(this.livroId, livro).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro atualizado!' });
          this.router.navigate(['/livros']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar livro.' });
          this.loading = false;
        }
      });
    } else {
      this.livroService.criarLivro(livro).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro criado!' });
          this.router.navigate(['/livros']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar livro.' });
          this.loading = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/livros']);
  }

  get titulo() { return this.form.get('titulo'); }
  get autor() { return this.form.get('autor'); }
  get editora() { return this.form.get('editora'); }
  get anoPublicacao() { return this.form.get('anoPublicacao'); }
}
