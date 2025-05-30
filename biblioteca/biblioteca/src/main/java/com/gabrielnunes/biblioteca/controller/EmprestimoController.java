package com.gabrielnunes.biblioteca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gabrielnunes.biblioteca.model.Emprestimo;
import com.gabrielnunes.biblioteca.service.EmprestimoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/emprestimos")
@CrossOrigin(origins = "*")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public ResponseEntity<List<Emprestimo>> listarTodos() {
        return ResponseEntity.ok(emprestimoService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Emprestimo> registrarEmprestimo(@Valid @RequestBody Emprestimo emprestimo) {
        return ResponseEntity.ok(emprestimoService.registrarEmprestimo(emprestimo));
    }

    @PutMapping("/{id}/devolucao")
    public ResponseEntity<Void> registrarDevolucao(@PathVariable Long id) {
        emprestimoService.registrarDevolucao(id);
        return ResponseEntity.ok().build();
    }
}
