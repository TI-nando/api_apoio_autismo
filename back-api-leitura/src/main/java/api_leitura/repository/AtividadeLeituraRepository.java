package api_leitura.repository;

import api_leitura.model.AtividadeLeitura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtividadeLeituraRepository extends JpaRepository<AtividadeLeitura, Long> {
    // So de estender o JpaRepository ganhamos metodos como:
    // save(), findAll(), findById(), deleteById() automaticamente
}
