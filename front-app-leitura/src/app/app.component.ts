import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

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

  // --- VARIÁVEIS PARA O PAINEL DOS PAIS ---
  mostrarPainelAdmin = false; // Controla se o painel secreto está aberto
  novaMissao = {
    textoCurto: '',
    descricaoRecompensa: '',
    nivelDificuldade: 1,
    urlImagemApoio: '' // É aqui que o código Base64 da imagem vai ficar guardado
  };

  // Variáveis para o Histórico e Gráfico
  historicoSessoes: any[] = [];
  graficoEvolucao: any;

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

  // --- FUNÇÕES DO PAINEL DOS PAIS ---

  // Função para abrir e fechar a passagem secreta
  alternarPainelAdmin() {
    this.mostrarPainelAdmin = !this.mostrarPainelAdmin;
    if (this.mostrarPainelAdmin) {
      this.carregarHistorico();
    }
    this.cdr.detectChanges();
  }

  // NOVA FUNÇÃO: Busca os dados no Java
  carregarHistorico() {
    this.http.get<any[]>('http://localhost:8080/api/atividades/sessoes')
      .subscribe({
        next: (dados) => {
          this.historicoSessoes = dados;
          this.cdr.detectChanges();

          // Chama a função para desenhar o gráfico logo após receber os dados
          setTimeout(() => this.renderizarGrafico(), 100);
        },
        error: (erro) => console.error('Erro ao buscar o histórico:', erro)
      });
  }

  // NOVA FUNÇÃO: Desenha o gráfico na tela
  renderizarGrafico() {
    const canvas = document.getElementById('meuGrafico') as HTMLCanvasElement;
    if (!canvas) return;

    // Se já existir um gráfico antigo, destrói para não bugar ao abrir e fechar o painel
    if (this.graficoEvolucao) {
      this.graficoEvolucao.destroy();
    }

    // Pega as datas para o eixo X e os tempos para o eixo Y
    const datas = this.historicoSessoes.map(sessao => {
      const data = new Date(sessao.dataHora);
      return `${data.getDate()}/${data.getMonth() + 1}`; // Ex: 15/05
    });

    const tempos = this.historicoSessoes.map(sessao => sessao.tempoGastoSegundos);

    // Cria o gráfico
    this.graficoEvolucao = new Chart(canvas, {
      type: 'line',
      data: {
        labels: datas,
        datasets: [{
          label: 'Tempo Gasto (em segundos)',
          data: tempos,
          borderColor: '#8e44ad',
          backgroundColor: 'rgba(142, 68, 173, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#2c3e50',
          fill: true,
          tension: 0.3 // Deixa a linha curvada e suave
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
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

// Reinicia a tela e busca uma nova missão
  reiniciarCiclo() {
    this.sucesso = false;
    this.mostrarTelinha = false;
    this.buscarMissao(); // Pede ao Java para carregar a próxima missão
    this.cdr.detectChanges();
  }
}
