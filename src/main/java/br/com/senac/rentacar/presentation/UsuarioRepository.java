package br.com.senac.rentacar.presentation;

import br.com.senac.rentacar.domain.entities.Usuario;
import org.springframework.data.repository.Repository;

interface UsuarioRepository extends Repository<Usuario, Long> {
}
