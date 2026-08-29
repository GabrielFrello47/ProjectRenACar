package br.com.senac.rentacar.controllers;

import br.com.senac.rentacar.DTOs.EsqueciSenhaRequest;
import br.com.senac.rentacar.DTOs.LoginRequest;
import br.com.senac.rentacar.DTOs.RedefinirSenhaRequest;
import br.com.senac.rentacar.respository.UsuarioRepository;
import br.com.senac.rentacar.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public AuthController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    @Operation(description = "Metodo de login", summary = "Autenticação de usuarios")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        if (usuarioRepository.existsUsuarioByEmailAndSenha(loginRequest.email(), loginRequest.senha())) {

            var token = tokenService.gerarToken(loginRequest.email());

            return ResponseEntity.ok(token);
        }

        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).build();
    }

    @PostMapping("/esqueci-senha")
    @Operation(description = "Gera um token de recuperação de senha", summary = "Esqueci minha senha")
    public ResponseEntity<?> esqueciSenha(@RequestBody EsqueciSenhaRequest esqueciSenhaRequest) {

        var token = tokenService.gerarTokenRecuperacaoSenha(esqueciSenhaRequest.email());

        System.out.println("Token de recuperação para " + esqueciSenhaRequest.email() + ": " + token);

        return ResponseEntity.ok("Um link de recuperação foi enviado para o seu e-mail.");
    }

    @PostMapping("/redefinir-senha")
    @Operation(description = "Redefine a senha do usuario a partir do token de recuperação", summary = "Redefinir senha")
    public ResponseEntity<?> redefinirSenha(@RequestBody RedefinirSenhaRequest redefinirSenhaRequest) {

        try {
            var jwtValidador = tokenService.verificarToken(redefinirSenhaRequest.token());

            var tipo = jwtValidador.getClaim("tipo").asString();

            if (!"recuperacao-senha".equals(tipo)) {
                return ResponseEntity.status(HttpURLConnection.HTTP_BAD_REQUEST).build();
            }

            var email = jwtValidador.getSubject();

            // Em um cenario real, atualizariamos a senha no banco de dados
            System.out.println("Senha do usuario " + email + " redefinida para: " + redefinirSenhaRequest.novaSenha());

            return ResponseEntity.ok("Senha redefinida com sucesso.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).body("Token invalido ou expirado");
        }
    }

}