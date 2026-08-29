package br.com.senac.rentacar.DTOs;

import br.com.senac.rentacar.entities.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status) {
}