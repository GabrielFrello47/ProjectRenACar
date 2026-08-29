package br.com.senac.rentacar.controllers;

import br.com.senac.rentacar.entities.Usuario;
import org.springframework.data.repository.Repository;

interface UsuarioRepository extends Repository<Usuario, Long> {
}
