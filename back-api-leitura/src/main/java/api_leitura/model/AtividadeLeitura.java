package api_leitura.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_atividade_leitura")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AtividadeLeitura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String textoCurto;

    @Column(name = "url_imagem_apoio")
    private String urlImagemApoio;

    @Column(nullable = false)
    private Integer nivelDificuldade;

    // Foco no MVP: o QUE ELE GANHA AO CONCLUIR (Ex: 15min de video game)
    @Column(name = "descricao_recompensa", nullable = false)
    private String descricaoRecompensa;
}
