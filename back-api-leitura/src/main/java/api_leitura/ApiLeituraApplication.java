package api_leitura;

import api_leitura.model.AtividadeLeitura;
import api_leitura.repository.AtividadeLeituraRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiLeituraApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiLeituraApplication.class, args);
	}

	// Esse metodo roda automaticamente quando o Spring Boot inicia
	@Bean
	CommandLineRunner initDatabase(AtividadeLeituraRepository repository) {
		return args -> {
			// criado a primeira missao focando no MVP.
			AtividadeLeitura missao1 = new AtividadeLeitura();
			missao1.setTextoCurto("O menino joga bola");
			missao1.setUrlImagemApoio("url-da-imagem-bola.jpg");
			missao1.setNivelDificuldade(1);
			missao1.setDescricaoRecompensa("15 minutos de video game");

			// Salvamos no banco de dados H2
			repository.save(missao1);
			System.out.println("Missão de leitura salva com sucesso no banco de dados!");
		};
	}

}
