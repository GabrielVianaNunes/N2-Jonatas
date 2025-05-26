package com.gabrielnunes.biblioteca.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gabrielnunes.biblioteca.model.Livro;
import com.gabrielnunes.biblioteca.repository.LivroRepository;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));
    }

    public Livro salvar(Livro livro) {
        if (livroRepository.existsByTitulo(livro.getTitulo()) && livro.getId() == null) {
            throw new IllegalArgumentException("Já existe um livro com esse título.");
        }
        return livroRepository.save(livro);
    }

    public void excluir(Long id) {
        Livro livro = buscarPorId(id);
        livroRepository.delete(livro);
    }
}
