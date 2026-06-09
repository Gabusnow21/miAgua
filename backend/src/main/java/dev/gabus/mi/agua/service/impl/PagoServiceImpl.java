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
import dev.gabus.mi.agua.service.FileStorageService;
import dev.gabus.mi.agua.service.NotificationService;
import dev.gabus.mi.agua.service.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepository;
    private final ReciboRepository reciboRepository;
    private final UsuarioRepository usuarioRepository;
    private final FileStorageService fileStorageService;
    private final NotificationService notificationService;

    @Override
    @Transactional
    public PagoDTO registrarPago(PagoRequestDTO dto, MultipartFile file) {
        Recibo recibo = reciboRepository.findById(dto.getReciboId())
                .orElseThrow(() -> new ResourceNotFoundException("Recibo no encontrado"));

        String comprobanteUrl = fileStorageService.storeFile(file);

        Pago pago = Pago.builder()
                .recibo(recibo)
                .montoPagado(dto.getMontoPagado())
                .fechaPago(LocalDateTime.now())
                .metodoPago(dto.getMetodoPago())
                .comprobanteUrl(comprobanteUrl)
                .referenciaTransaccion(dto.getReferenciaTransaccion())
                .build();

        // Al registrar un pago, el recibo pasa a revisión
        recibo.setEstado(PaymentStatus.EN_REVISION);
        reciboRepository.save(recibo);

        return mapToDTO(pagoRepository.save(pago));
    }

    @Override
    @Transactional
    public void verificarPago(Long pagoId, Long adminId, boolean aprobado, String motivo) {
        Pago pago = pagoRepository.findById(pagoId)
                .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado"));

        Usuario admin = usuarioRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Administrador no encontrado"));

        pago.setVerificadoPor(admin);
        pago.setFechaVerificacion(LocalDateTime.now());
        pagoRepository.save(pago);

        Recibo recibo = pago.getRecibo();
        if (aprobado) {
            recibo.setEstado(PaymentStatus.PAGADO);
        } else {
            recibo.setEstado(PaymentStatus.RECHAZADO);
            // Notificar al vecino
            notificationService.enviarNotificacionPagoRechazado(recibo, motivo);
        }
        reciboRepository.save(recibo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PagoDTO> listarPorRecibo(Long reciboId) {
        return pagoRepository.findByReciboId(reciboId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private PagoDTO mapToDTO(Pago pago) {
        return PagoDTO.builder()
                .id(pago.getId())
                .reciboId(pago.getRecibo().getId())
                .montoPagado(pago.getMontoPagado())
                .fechaPago(pago.getFechaPago())
                .metodoPago(pago.getMetodoPago())
                .comprobanteUrl(pago.getComprobanteUrl())
                .referenciaTransaccion(pago.getReferenciaTransaccion())
                .verificadoPorNombre(pago.getVerificadoPor() != null ? pago.getVerificadoPor().getFullName() : null)
                .fechaVerificacion(pago.getFechaVerificacion())
                .build();
    }
}
