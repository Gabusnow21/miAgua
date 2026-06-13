package dev.gabus.mi.agua.config;

import dev.gabus.mi.agua.model.entity.Usuario;
import dev.gabus.mi.agua.model.enums.UserRole;
import dev.gabus.mi.agua.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            if (usuarioRepository.count() == 0) {
                log.info("Iniciando creación de usuario administrador por defecto...");
                Usuario admin = Usuario.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .email("admin@miagua.com")
                        .fullName("Administrador del Sistema")
                        .role(UserRole.ADMIN)
                        .enabled(true)
                        .build();
                usuarioRepository.save(admin);
                log.info("Usuario administrador creado con éxito: admin / admin123");
            }
        };
    }
}
