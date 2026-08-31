package br.com.senac.rentacar.controllers;

import br.com.senac.rentacar.entities.Veiculo;
import br.com.senac.rentacar.respository.VeiculoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/veiculos")
@Tag(name = "Veiculos", description = "Grupo de APIs responsavel por controlar a estrutura de veiculos do sistema")
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(veiculoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id){

        Veiculo veiculoBanco = veiculoRepository.findById(id).orElse(null);
        if(veiculoBanco != null){
            return ResponseEntity.ok(veiculoBanco);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criar de veiculos", description = "Metodo responsavel de criação de novos veiculos!")
    public ResponseEntity<Veiculo> criar(@RequestBody Veiculo veiculo){

        var veiculoBanco = veiculoRepository.save(veiculo);
        return ResponseEntity.ok(veiculoBanco);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        try {
            Veiculo veiculoBanco = veiculoRepository.findById(id).orElse(null);

            if (veiculoBanco != null) {
                veiculoBanco.setMarca(veiculo.getMarca());
                veiculoBanco.setModelo(veiculo.getModelo());
                veiculoBanco.setPlaca(veiculo.getPlaca());
                veiculoBanco.setAno(veiculo.getAno());
                veiculoBanco.setValorDiaria(veiculo.getValorDiaria());
                veiculoRepository.save(veiculoBanco);
                return ResponseEntity.ok().build();
            }

            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        veiculoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}