package api_leitura.controller;

import api_leitura.dto.RegistroSessaoRequest;
import api_leitura.model.AtividadeLeitura;
import api_leitura.service.AtividadeLeituraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/atividades")
@CrossOrigin(origins = "*") // Fundamental para permitir que o Angular conecte aqui depois
public class AtividadeLeituraController {

    @Autowired
    private AtividadeLeituraService service;

    @GetMapping("/proxima")
    public ResponseEntity<AtividadeLeitura> buscarProxima() {
        return ResponseEntity.ok(service.buscarProxima());
    }

    @PostMapping("/{id}/concluir")
    public ResponseEntity<Void> concluirAtividade(@PathVariable Long id, @RequestBody RegistroSessaoRequest request) {
        service.registrarSessao(id, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<AtividadeLeitura> criarNovaMissao(@RequestBody AtividadeLeitura novaMissao) {
        // Agora chamamos o Service, mantendo a sua arquitetura limpa e profissional
        AtividadeLeitura missaoSalva = service.salvarNovaMissao(novaMissao);

        // Parêntese corrigido
        return ResponseEntity.status(HttpStatus.CREATED).body(missaoSalva);
    }
}