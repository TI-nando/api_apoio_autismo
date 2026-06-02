package api_leitura.controller;

import api_leitura.dto.RegistroSessaoRequest;
import api_leitura.model.AtividadeLeitura;
import api_leitura.service.AtividadeLeituraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/atividades")
@CrossOrigin(origins = "*") // Fundamental para permitir que o Angular conecte aqui depois
public class AtividadeLeituraController {

    @Autowired
    private AtividadeLeituraService service;

    // URL: GET http://localhost:8080/api/atividades/proxima
    @GetMapping("/proxima")
    public ResponseEntity<AtividadeLeitura> buscarProxima() {
        return ResponseEntity.ok(service.buscarProxima());
    }

    // URL: POST http://localhost:8080/api/atividades/1/concluir
    @PostMapping("/{id}/concluir")
    public ResponseEntity<Void> concluirAtividade(@PathVariable Long id, @RequestBody RegistroSessaoRequest request) {
        service.registrarSessao(id, request);
        return ResponseEntity.ok().build();
    }
}