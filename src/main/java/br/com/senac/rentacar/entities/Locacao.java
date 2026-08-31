package br.com.senac.rentacar.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Locacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public LocalDate dataInicio;

    public LocalDate dataFim;

    public Double valorTotal;

    public String cliente;

    public String veiculo;
}