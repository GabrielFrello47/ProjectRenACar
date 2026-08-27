package br.com.senac.rentacar.controllers;

import br.com.senac.rentacar.entities.Cliente;
import br.com.senac.rentacar.respository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    // LISTAR TODOS
    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(clienteRepository.findAll());
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {

        var cliente = clienteRepository.findById(id);

        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Cliente não encontrado");
    }

    // CRIAR
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {

        var clienteBanco = clienteRepository.save(cliente);

        return ResponseEntity.ok(clienteBanco);
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody Cliente cliente) {

        var clienteBanco = clienteRepository.findById(id);

        if (clienteBanco.isPresent()) {

            Cliente clienteExistente = clienteBanco.get();

            clienteExistente.setNome(cliente.getNome());
            clienteExistente.setCpf(cliente.getCpf());
            clienteExistente.setTelefone(cliente.getTelefone());
            clienteExistente.setEmail(cliente.getEmail());

            return ResponseEntity.ok(
                    clienteRepository.save(clienteExistente)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Cliente não encontrado");
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {

        if (clienteRepository.existsById(id)) {

            clienteRepository.deleteById(id);

            return ResponseEntity.ok("Cliente deletado com sucesso");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Cliente não encontrado");
    }
}