package br.com.senac.rentacar.application.services;

import br.com.senac.rentacar.application.DTOs.LoginRequest;
import br.com.senac.rentacar.application.DTOs.LoginResponse;
import br.com.senac.rentacar.application.DTOs.UsuarioResponse;
import br.com.senac.rentacar.domain.respository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

    @Service
    public class UsuarioService {

        @Autowired
        private UsuarioRepository usuarioRepository;

        @Autowired
        private TokenService tokenService;

        public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest resquest) {

            if (usuarioRepository.existsUsuarioByEmailAndSenha(resquest.email(), resquest.senha())) {

                var token = tokenService.gerarToken(resquest);
                return new LoginResponse(token);
            }
            return null;
        }


        public List<UsuarioResponse> listarTodosUsuariosTable(){

            return  usuarioRepository.findAll()
                    .stream()
                    .map(UsuarioResponse::new)
                    .toList();
        }
    }

