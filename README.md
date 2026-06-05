# 🧩 App de Alfabetização Inclusiva (Projeto Leitura)

Um ecossistema Fullstack projetado do zero para apoiar a alfabetização de crianças com Transtorno do Espectro Autista (TEA) e TDAH.

Este projeto nasceu da necessidade real de criar um ambiente de aprendizagem digital que respeitasse limitações de memória operacional e hiperatividade, eliminando estímulos distratores e utilizando o raciocínio analógico concreto como ponte para a leitura.

## ✨ Funcionalidades (MVP)

A aplicação foi dividida em duas áreas principais, garantindo que o utilizador final tenha uma experiência 100% focada:

* **👦 Área da Criança (Modo Foco):**
    * **Interface Minimalista:** Ausência de menus ou distrações periféricas.
    * **Apoio Visual Concreto:** Exibição de imagem diretamente correspondente à frase, servindo como âncora cognitiva.
    * **Recompensa Imediata:** Fluxo previsível e gamificado. Ao concluir a leitura, o sistema celebra e informa a recompensa (ex: "15 min de videogame").

* **⚙️ Área dos Pais / Terapeutas (Passagem Secreta):**
    * **Painel Administrativo Oculto:** Acesso via botão invisível para não distrair a criança.
    * **Criação de Missões Dinâmicas:** Cadastro de novas frases e recompensas.
    * **Upload de Imagens em Base64:** Leitura nativa de ficheiros locais via `FileReader` no Angular e envio estruturado para o backend.
    * **Avaliação Clínica (Sessão):** Após a missão, o adulto preenche um formulário rápido (tempo gasto, nível de ajuda e grau de irritabilidade), cujos dados são persistidos para futura análise evolutiva.

## 🛠️ Arquitetura e Tecnologias

O projeto foi construído num monorepo (separação clara entre Front e Back), utilizando as melhores práticas de mercado para desenvolvimento Web.

**Backend (Java / Spring Boot):**
* **Java 17+** com **Spring Boot**.
* **Spring Web:** Criação de API RESTful com rotas de `GET` e `POST`.
* **Spring Data JPA:** Abstração da camada de persistência.
* **H2 Database:** Banco de dados relacional em memória. Suporte configurado para anotações `@Lob` e `TEXT` para armazenamento robusto das imagens em Base64.
* **Padrão de Camadas:** Organização clara entre `Controller`, `Service`, `Repository` e `Model/Entity`, além da utilização de DTOs (`RegistroSessaoRequest`).

**Frontend (Angular):**
* **Angular 17+** (Standalone Components).
* **HttpClient:** Integração assíncrona com a API REST do Java.
* **FormsModule:** Manipulação de formulários e *two-way data binding* (`[(ngModel)]`).
* **UX/UI Customizada:** CSS puro focado em acessibilidade, transições suaves (`fadeIn`) e controle de estado dinâmico (`@if`) para renderização condicional dos ecrãs.

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Java JDK 17 ou superior
* Node.js e Angular CLI instalados
* Maven

### Rodando o Backend (Spring Boot)
1. Navegue até a pasta do backend: `cd backend-leitura` (ou o nome do seu diretório Java).
2. Deixe o Maven baixar as dependências e inicie a aplicação.
3. O servidor estará rodando em: `http://localhost:8080`

### Rodando o Frontend (Angular)
1. Navegue até a pasta do frontend: `cd front-app-leitura`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `ng serve -o`
4. O navegador abrirá automaticamente em: `http://localhost:4200`

## 👨‍💻 Autor

**Fernando Henrique Silva**
Desenvolvedor Fullstack focado em criar soluções que unem tecnologia robusta e impacto social real.

---
*Este projeto é um MVP em evolução. Os próximos passos incluem a construção de um dashboard de histórico evolutivo da criança.*