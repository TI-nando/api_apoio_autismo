package api_leitura.repository;

import api_leitura.model.SessaoLeitura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessaoLeituraRepository extends JpaRepository<SessaoLeitura, Long> {
}
