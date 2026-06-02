package api_leitura.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroSessaoRequest {
    // Dados que os pais ou terapeutas vao enviar ao concluir a leitura
    private Integer tempoGastoSegundos;
    private Boolean precisouAjuda;
    private Integer nivelIrritabilidade;
}
