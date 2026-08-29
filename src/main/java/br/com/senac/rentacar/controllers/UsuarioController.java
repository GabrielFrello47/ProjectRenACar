package br.com.senac.rentacar.controllers;

import br.com.senac.rentacar.DTOs.AtualizarStatusRequest;
import br.com.senac.rentacar.entities.Usuario;
import br.com.senac.rentacar.respository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios", description = "Grupo de APIs responsavel por controlar a estrutura de usuarios do sistema")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de usuarios!", description = "Metodo responsavel de todos os usuarios sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return  ResponseEntity.ok(usuarioRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criar de usuarios", description = "Metodo responsavel de criação de novos usuarios!")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario){

        var usuarioBanco = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioBanco);

    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Metodo de atualização de status do usuario", description = "Atualiza o status (ativo/inativo) de um usuario")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {
            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        try {
            Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);

            if (usuarioBanco != null) {
                usuarioBanco.setStatus(usuario.getStatus());
                usuarioBanco.setNome(usuario.getNome());
                usuarioBanco.setCpf(usuario.getCpf());
                usuarioBanco.setEmail(usuario.getEmail());
                usuarioBanco.setSenha(usuario.getSenha());
                usuarioRepository.save(usuarioBanco);
                return ResponseEntity.ok().build();
            }

            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}