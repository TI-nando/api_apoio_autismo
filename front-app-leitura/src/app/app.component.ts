import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  atividade: any = null;

  // Variáveis da tela da criança
  mostrarTelinha = false;
  sucesso = false;

  // Variáveis da avaliação
  tempoGastoMinutos: number = 2;
  precisouAjuda: string = 'false';
  nivelIrritabilidade: number = 1;

  // --- NOVAS VARIÁVEIS PARA O PAINEL DOS PAIS ---
  mostrarPainelAdmin = false; // Controla se o painel secreto está aberto
  novaMissao = {
    textoCurto: '',
    descricaoRecompensa: '',
    nivelDificuldade: 1,
    urlImagemApoio: '' // É aqui que o código Base64 da imagem vai ficar guardado
  };

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

  abrirTelinha() {
    this.mostrarTelinha = true;
    this.cdr.detectChanges();
  }

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

  // --- NOVAS FUNÇÕES DO PAINEL DOS PAIS ---

  // Função para abrir e fechar a passagem secreta
  alternarPainelAdmin() {
    this.mostrarPainelAdmin = !this.mostrarPainelAdmin;
    this.cdr.detectChanges();
  }

  // A função MÁGICA que lê a imagem do computador e converte para texto (Base64)
  onFileSelected(event: any) {
    const file = event.target.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
      const reader = new FileReader();

      // O que fazer quando terminar de ler o arquivo:
      reader.onload = (e: any) => {
        // e.target.result contém o texto gigante em Base64
        this.novaMissao.urlImagemApoio = e.target.result;
        this.cdr.detectChanges();
      };

      // Manda o leitor processar a imagem
      reader.readAsDataURL(file);
    }
  }

  // Envia a missão pronta para a rota POST que criamos no Java
  salvarNovaMissao() {
    this.http.post('http://localhost:8080/api/atividades', this.novaMissao)
      .subscribe({
        next: (missaoSalva) => {
          alert('Nova missão criada com sucesso!');

          // Fecha o painel e já coloca a missão nova na tela!
          this.mostrarPainelAdmin = false;
          this.atividade = missaoSalva;
          this.sucesso = false;
          this.mostrarTelinha = false;

          // Limpa o formulário para a próxima vez
          this.novaMissao = { textoCurto: '', descricaoRecompensa: '', nivelDificuldade: 1, urlImagemApoio: '' };

          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao criar nova missão:', erro);
          alert('Erro ao salvar nova missão. Verifique o console do navegador.');
        }
      });
  }
}
