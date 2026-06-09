package dev.gabus.mi.agua.repository;

import dev.gabus.mi.agua.model.entity.Usuario;
import dev.gabus.mi.agua.model.enums.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    void findByEmail_ReturnsUsuario_WhenExists() {
        // Arrange
        Usuario usuario = Usuario.builder()
                .username("testuser")
                .email("test@example.com")
                .password("password")
                .fullName("Test User")
                .role(UserRole.VECINO)
                .build();
        usuarioRepository.save(usuario);

        // Act
        Optional<Usuario> found = usuarioRepository.findByEmail("test@example.com");

        // Assert
        assertTrue(found.isPresent());
        assertEquals("Test User", found.get().getFullName());
    }

    @Test
    void findByEmail_ReturnsEmpty_WhenDoesNotExist() {
        // Act
        Optional<Usuario> found = usuarioRepository.findByEmail("nonexistent@example.com");

        // Assert
        assertFalse(found.isPresent());
    }
}
