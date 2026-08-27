package br.com.senac.rentacar.controllers;


import br.com.senac.rentacar.entities.Veiculo;
import br.com.senac.rentacar.respository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    // LISTAR TODOS
    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(veiculoRepository.findAll());
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {

        var veiculo = veiculoRepository.findById(id);

        if (veiculo.isPresent()) {
            return ResponseEntity.ok(veiculo.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Veículo não encontrado");
    }

    // CRIAR
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Veiculo> criar(@RequestBody Veiculo veiculo) {

        var veiculoBanco = veiculoRepository.save(veiculo);

        return ResponseEntity.ok(veiculoBanco);
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody Veiculo veiculo) {

        var veiculoBanco = veiculoRepository.findById(id);

        if (veiculoBanco.isPresent()) {

            Veiculo veiculoExistente = veiculoBanco.get();

            veiculoExistente.setMarca(veiculo.getMarca());
            veiculoExistente.setModelo(veiculo.getModelo());
            veiculoExistente.setPlaca(veiculo.getPlaca());
            veiculoExistente.setAno(veiculo.getAno());
            veiculoExistente.setValorDiaria(veiculo.getValorDiaria());

            return ResponseEntity.ok(
                    veiculoRepository.save(veiculoExistente)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Veículo não encontrado");
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {

        if (veiculoRepository.existsById(id)) {

            veiculoRepository.deleteById(id);

            return ResponseEntity.ok("Veículo deletado com sucesso");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Veículo não encontrado");
    }
}