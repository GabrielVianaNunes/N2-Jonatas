package com.gabrielnunes.biblioteca.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Livro é obrigatório")
    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @NotNull(message = "Data de empréstimo é obrigatória")
    private LocalDate dataEmprestimo;

    @NotNull(message = "Data de devolução prevista é obrigatória")
    private LocalDate dataDevolucaoPrevista;

    @Enumerated(EnumType.STRING)
    private StatusEmprestimo status = StatusEmprestimo.EMPRESTADO;

    public Emprestimo() {}

    public Emprestimo(Long id, Livro livro, Usuario usuario, LocalDate dataEmprestimo, LocalDate dataDevolucaoPrevista, StatusEmprestimo status) {
        this.id = id;
        this.livro = livro;
        this.usuario = usuario;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Livro getLivro() {
        return livro;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public LocalDate getDataDevolucaoPrevista() {
        return dataDevolucaoPrevista;
    }

    public StatusEmprestimo getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public void setDataDevolucaoPrevista(LocalDate dataDevolucaoPrevista) {
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
    }

    public void setStatus(StatusEmprestimo status) {
        this.status = status;
    }
}
