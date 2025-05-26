package com.gabrielnunes.biblioteca.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gabrielnunes.biblioteca.model.Emprestimo;
import com.gabrielnunes.biblioteca.model.Livro;
import com.gabrielnunes.biblioteca.model.StatusEmprestimo;
import com.gabrielnunes.biblioteca.model.Usuario;
import com.gabrielnunes.biblioteca.repository.EmprestimoRepository;
import com.gabrielnunes.biblioteca.repository.LivroRepository;
import com.gabrielnunes.biblioteca.repository.UsuarioRepository;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Emprestimo> listarTodos() {
        return emprestimoRepository.findAll();
    }

    public Emprestimo registrarEmprestimo(Emprestimo emprestimo) {
        Usuario usuario = usuarioRepository.findById(emprestimo.getUsuario().getId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        Livro livro = livroRepository.findById(emprestimo.getLivro().getId())
                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));

        long emprestimosAtivos = emprestimoRepository.findByUsuarioAndStatus(usuario, StatusEmprestimo.EMPRESTADO).size();
        if (emprestimosAtivos >= 3) {
            throw new IllegalStateException("Usuário já tem o máximo de 3 empréstimos ativos.");
        }

        boolean livroEmprestado = !emprestimoRepository.findByLivroAndStatus(livro, StatusEmprestimo.EMPRESTADO).isEmpty();
        if (livroEmprestado) {
            throw new IllegalStateException("Este livro já está emprestado.");
        }

        emprestimo.setStatus(StatusEmprestimo.EMPRESTADO);
        return emprestimoRepository.save(emprestimo);
    }

    public void registrarDevolucao(Long id) {
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Empréstimo não encontrado"));

        if (emprestimo.getStatus() == StatusEmprestimo.DEVOLVIDO) {
            throw new IllegalStateException("Esse empréstimo já foi devolvido.");
        }

        emprestimo.setStatus(StatusEmprestimo.DEVOLVIDO);
        emprestimoRepository.save(emprestimo);
    }
}
