package br.com.senac.rentacar.controllers;

import br.com.senac.rentacar.entities.Locacao;
import br.com.senac.rentacar.respository.LocacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/locacoes")
public class LocacaoController {

    @Autowired
    private LocacaoRepository locacaoRepository;

    // LISTAR TODOS
    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(locacaoRepository.findAll());
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {

        var locacao = locacaoRepository.findById(id);

        if (locacao.isPresent()) {
            return ResponseEntity.ok(locacao.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Locação não encontrada");
    }

    // CRIAR
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Locacao> criar(@RequestBody Locacao locacao) {

        var locacaoBanco = locacaoRepository.save(locacao);

        return ResponseEntity.ok(locacaoBanco);
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody Locacao locacao) {

        var locacaoBanco = locacaoRepository.findById(id);

        if (locacaoBanco.isPresent()) {

            Locacao locacaoExistente = locacaoBanco.get();

            locacaoExistente.setDataInicio(locacao.getDataInicio());
            locacaoExistente.setDataFim(locacao.getDataFim());
            locacaoExistente.setValorTotal(locacao.getValorTotal());
            locacaoExistente.setCliente(locacao.getCliente());
            locacaoExistente.setVeiculo(locacao.getVeiculo());

            return ResponseEntity.ok(
                    locacaoRepository.save(locacaoExistente)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Locação não encontrada");
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {

        if (locacaoRepository.existsById(id)) {

            locacaoRepository.deleteById(id);

            return ResponseEntity.ok("Locação deletada com sucesso");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Locação não encontrada");
    }
}