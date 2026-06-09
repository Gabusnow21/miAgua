package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.dto.LecturaDTO;
import dev.gabus.mi.agua.dto.LecturaRequestDTO;
import dev.gabus.mi.agua.exception.ResourceNotFoundException;
import dev.gabus.mi.agua.model.entity.*;
import dev.gabus.mi.agua.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LecturaServiceImplTest {

    @Mock
    private LecturaRepository lecturaRepository;
    @Mock
    private PropiedadRepository propiedadRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private TarifaRepository tarifaRepository;
    @Mock
    private ReciboRepository reciboRepository;

    @InjectMocks
    private LecturaServiceImpl lecturaService;

    private Propiedad propiedad;
    private Usuario usuario;
    private Tarifa tarifa;
    private LecturaRequestDTO requestDTO;

    @BeforeEach
    void setUp() {
        propiedad = Propiedad.builder().id(1L).codigo("P-001").build();
        usuario = Usuario.builder().id(1L).username("johndoe").fullName("John Doe").build();
        tarifa = Tarifa.builder().id(1L).cuotaFija(10.0).precioMetroCubico(2.0).activa(true).build();

        requestDTO = new LecturaRequestDTO();
        requestDTO.setPropiedadId(1L);
        requestDTO.setLecturaActual(150.0);
        requestDTO.setMes(6);
        requestDTO.setAnio(2026);
    }

    @Test
    void registrarLectura_Success() {
        // Arrange
        when(propiedadRepository.findById(1L)).thenReturn(Optional.of(propiedad));
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(lecturaRepository.findTopByPropiedadIdOrderByAnioDescMesDesc(1L)).thenReturn(Optional.of(
                Lectura.builder().lecturaActual(100.0).build()
        ));
        when(tarifaRepository.findByActivaTrue()).thenReturn(Optional.of(tarifa));
        when(lecturaRepository.save(any(Lectura.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        LecturaDTO result = lecturaService.registrarLectura(requestDTO, 1L);

        // Assert
        assertNotNull(result);
        assertEquals(50.0, result.getConsumo()); // 150 - 100
        assertEquals(150.0, result.getLecturaActual());
        verify(reciboRepository, times(1)).save(any(Recibo.class));
        verify(lecturaRepository, times(1)).save(any(Lectura.class));
    }

    @Test
    void registrarLectura_ThrowsException_WhenLecturaActualIsLowerThanAnterior() {
        // Arrange
        when(propiedadRepository.findById(1L)).thenReturn(Optional.of(propiedad));
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(lecturaRepository.findTopByPropiedadIdOrderByAnioDescMesDesc(1L)).thenReturn(Optional.of(
                Lectura.builder().lecturaActual(200.0).build()
        ));

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            lecturaService.registrarLectura(requestDTO, 1L);
        });
    }

    @Test
    void registrarLectura_ThrowsException_WhenPropiedadNotFound() {
        // Arrange
        when(propiedadRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            lecturaService.registrarLectura(requestDTO, 1L);
        });
    }
}
