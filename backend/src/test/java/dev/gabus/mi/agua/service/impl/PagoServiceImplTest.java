package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.dto.PagoDTO;
import dev.gabus.mi.agua.dto.PagoRequestDTO;
import dev.gabus.mi.agua.exception.ResourceNotFoundException;
import dev.gabus.mi.agua.model.entity.Pago;
import dev.gabus.mi.agua.model.entity.Recibo;
import dev.gabus.mi.agua.model.entity.Usuario;
import dev.gabus.mi.agua.model.enums.PaymentStatus;
import dev.gabus.mi.agua.repository.PagoRepository;
import dev.gabus.mi.agua.repository.ReciboRepository;
import dev.gabus.mi.agua.repository.UsuarioRepository;
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
class PagoServiceImplTest {

    @Mock
    private PagoRepository pagoRepository;
    @Mock
    private ReciboRepository reciboRepository;
    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private PagoServiceImpl pagoService;

    private Recibo recibo;
    private Usuario admin;
    private PagoRequestDTO requestDTO;

    @BeforeEach
    void setUp() {
        recibo = Recibo.builder().id(1L).montoTotal(20.0).estado(PaymentStatus.PENDIENTE).build();
        admin = Usuario.builder().id(2L).username("admin").fullName("Admin User").build();

        requestDTO = new PagoRequestDTO();
        requestDTO.setReciboId(1L);
        requestDTO.setMontoPagado(20.0);
        requestDTO.setMetodoPago("TRANSFERENCIA");
        requestDTO.setReferenciaTransaccion("REF123");
    }

    @Test
    void registrarPago_Success() {
        // Arrange
        when(reciboRepository.findById(1L)).thenReturn(Optional.of(recibo));
        when(pagoRepository.save(any(Pago.class))).thenAnswer(invocation -> {
            Pago p = invocation.getArgument(0);
            p.setId(1L);
            return p;
        });

        // Act
        PagoDTO result = pagoService.registrarPago(requestDTO);

        // Assert
        assertNotNull(result);
        assertEquals(PaymentStatus.EN_REVISION, recibo.getEstado());
        verify(reciboRepository, times(1)).save(recibo);
        verify(pagoRepository, times(1)).save(any(Pago.class));
    }

    @Test
    void verificarPago_Aprobado_Success() {
        // Arrange
        Pago pago = Pago.builder().id(1L).recibo(recibo).build();
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(pago));
        when(usuarioRepository.findById(2L)).thenReturn(Optional.of(admin));

        // Act
        pagoService.verificarPago(1L, 2L, true);

        // Assert
        assertEquals(PaymentStatus.PAGADO, recibo.getEstado());
        assertEquals(admin, pago.getVerificadoPor());
        verify(pagoRepository, times(1)).save(pago);
        verify(reciboRepository, times(1)).save(recibo);
    }

    @Test
    void verificarPago_Rechazado_Success() {
        // Arrange
        Pago pago = Pago.builder().id(1L).recibo(recibo).build();
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(pago));
        when(usuarioRepository.findById(2L)).thenReturn(Optional.of(admin));

        // Act
        pagoService.verificarPago(1L, 2L, false);

        // Assert
        assertEquals(PaymentStatus.RECHAZADO, recibo.getEstado());
        verify(reciboRepository, times(1)).save(recibo);
    }

    @Test
    void verificarPago_ThrowsException_WhenPagoNotFound() {
        // Arrange
        when(pagoRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            pagoService.verificarPago(1L, 2L, true);
        });
    }
}
