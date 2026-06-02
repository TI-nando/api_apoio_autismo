package api_leitura.service;

import api_leitura.dto.RegistroSessaoRequest;
import api_leitura.model.AtividadeLeitura;
import api_leitura.model.SessaoLeitura;
import api_leitura.repository.AtividadeLeituraRepository;
import api_leitura.repository.SessaoLeituraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AtividadeLeituraService {

    @Autowired
    private AtividadeLeituraRepository atividadeRepository;

    @Autowired
    private SessaoLeituraRepository sessaoRepository;

    // Busca a missão para exibir na tela
    public AtividadeLeitura buscarProxima() {
        // Para o MVP rodar rápido, vamos pegar a primeira atividade que achar no banco
        return atividadeRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("Nenhuma atividade cadastrada."));
    }

    // Registra como foi o comportamento da criança durante a missão
    public void registrarSessao(Long atividadeId, RegistroSessaoRequest request) {
        AtividadeLeitura atividade = atividadeRepository.findById(atividadeId)
                .orElseThrow(() -> new RuntimeException("Atividade não encontrada."));

        SessaoLeitura sessao = new SessaoLeitura();
        sessao.setAtividadeLeitura(atividade);
        sessao.setDataHora(LocalDateTime.now());
        sessao.setTempoGastoSegundos(request.getTempoGastoSegundos());
        sessao.setPrecisouAjuda(request.getPrecisouAjuda());
        sessao.setNivelIrritabilidade(request.getNivelIrritabilidade());

        sessaoRepository.save(sessao);
    }
}