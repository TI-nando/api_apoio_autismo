package api_leitura.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "table_sessao_leitura")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessaoLeitura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacionamento: Muitas sessões pertencem a uma mesma atividade de leitura
    @ManyToOne
    @JoinColumn(name = "atividade_leitura_id", nullable = false)
    private AtividadeLeitura atividadeLeitura;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Column(name = "tempo_gasto_segundos")
    private Integer tempoGastoSegundos;

    @Column(name = "precisou_ajuda")
    private Boolean precisouAjuda;

    @Column(name = "nivel_irritabilidade")
    private Integer nivelIrritabilidade; // Escala de 1 a 5
}
