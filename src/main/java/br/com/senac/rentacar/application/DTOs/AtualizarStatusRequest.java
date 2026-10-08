package br.com.senac.rentacar.application.DTOs;

import br.com.senac.rentacar.domain.entities.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status) {
}