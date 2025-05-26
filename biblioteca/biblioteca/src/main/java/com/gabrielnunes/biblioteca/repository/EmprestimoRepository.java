package com.gabrielnunes.biblioteca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gabrielnunes.biblioteca.model.Emprestimo;
import com.gabrielnunes.biblioteca.model.Livro;
import com.gabrielnunes.biblioteca.model.StatusEmprestimo;
import com.gabrielnunes.biblioteca.model.Usuario;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByUsuarioAndStatus(Usuario usuario, StatusEmprestimo status);
    List<Emprestimo> findByLivroAndStatus(Livro livro, StatusEmprestimo status);
}
