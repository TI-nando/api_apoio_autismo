import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- Essencial para os inputs da telinha

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- FormsModule adicionado aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  atividade: any = null;

  // Variáveis que controlam qual tela aparece (o HTML estava sentindo falta delas!)
  mostrarTelinha = false;
  sucesso = false;

  // Variáveis para guardar os dados que você preencher no formulário
  tempoGastoMinutos: number = 2;
  precisouAjuda: string = 'false';
  nivelIrritabilidade: number = 1;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.buscarMissao();
  }

  buscarMissao() {
    this.http.get('http://localhost:8080/api/atividades/proxima')
      .subscribe({
        next: (dados) => {
          this.atividade = dados;
          this.cdr.detectChanges();
        },
        error: (erro) => console.error('Erro ao buscar a missão:', erro)
      });
  }

  // Função chamada ao clicar em "Concluí a leitura!"
  abrirTelinha() {
    this.mostrarTelinha = true;
    this.cdr.detectChanges();
  }

  // Função chamada para enviar a avaliação para o Java
  salvarSessao() {
    const payload = {
      tempoGastoSegundos: this.tempoGastoMinutos * 60,
      precisouAjuda: this.precisouAjuda === 'true',
      nivelIrritabilidade: Number(this.nivelIrritabilidade)
    };

    this.http.post(`http://localhost:8080/api/atividades/${this.atividade.id}/concluir`, payload)
      .subscribe({
        next: () => {
          this.sucesso = true;
          this.mostrarTelinha = false;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao salvar a sessão no banco:', erro);
          alert('Deu erro ao salvar! Veja o console.');
        }
      });
  }
}
