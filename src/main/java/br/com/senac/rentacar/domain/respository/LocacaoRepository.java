package br.com.senac.rentacar.domain.respository;

import br.com.senac.rentacar.domain.entities.Locacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long> {

}