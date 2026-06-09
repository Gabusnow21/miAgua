package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.dto.PagoDTO;
import dev.gabus.mi.agua.dto.PagoRequestDTO;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface PagoService {
    PagoDTO registrarPago(PagoRequestDTO pagoRequestDTO, MultipartFile file);
    void verificarPago(Long pagoId, Long adminId, boolean aprobado);
    List<PagoDTO> listarPorRecibo(Long reciboId);
}
