import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Necessário para usar variáveis no HTML
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Variável que vai guardar os dados que chegam do Java
  atividade: any = null;

  // Injeta o HttpClient no construtor
  constructor(private http: HttpClient) {}

  // O ngOnInit corre automaticamente assim que o ecrã abre
  ngOnInit(): void {
    this.buscarMissao();
  }

  buscarMissao() {
    // Faz um pedido GET à nossa API Java
    this.http.get('http://localhost:8080/api/atividades/proxima')
      .subscribe({
        next: (dados) => {
          this.atividade = dados; // Guarda os dados recebidos
          console.log('Missão carregada:', this.atividade);
        },
        error: (erro) => {
          console.error('Erro ao buscar a missão. O backend está ligado?', erro);
        }
      });
  }
}
