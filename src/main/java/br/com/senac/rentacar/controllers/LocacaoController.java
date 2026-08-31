package br.com.senac.rentacar.controllers;

import br.com.senac.rentacar.entities.Locacao;
import br.com.senac.rentacar.respository.LocacaoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/locacoes")
@Tag(name = "Locacoes", description = "Grupo de APIs responsavel por controlar a estrutura de locacoes do sistema")
public class LocacaoController {

    @Autowired
    private LocacaoRepository locacaoRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(locacaoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locacao> buscarPorId(@PathVariable Long id){

        Locacao locacaoBanco = locacaoRepository.findById(id).orElse(null);
        if(locacaoBanco != null){
            return ResponseEntity.ok(locacaoBanco);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criar de locacoes", description = "Metodo responsavel de criação de novas locacoes!")
    public ResponseEntity<Locacao> criar(@RequestBody Locacao locacao){

        var locacaoBanco = locacaoRepository.save(locacao);
        return ResponseEntity.ok(locacaoBanco);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Locacao> atualizar(@PathVariable Long id, @RequestBody Locacao locacao) {
        try {
            Locacao locacaoBanco = locacaoRepository.findById(id).orElse(null);

            if (locacaoBanco != null) {
                locacaoBanco.setDataInicio(locacao.getDataInicio());
                locacaoBanco.setDataFim(locacao.getDataFim());
                locacaoBanco.setValorTotal(locacao.getValorTotal());
                locacaoBanco.setCliente(locacao.getCliente());
                locacaoBanco.setVeiculo(locacao.getVeiculo());
                locacaoRepository.save(locacaoBanco);
                return ResponseEntity.ok().build();
            }

            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        locacaoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}