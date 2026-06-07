package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.dto.ReciboDTO;
import dev.gabus.mi.agua.model.enums.PaymentStatus;
import java.util.List;

public interface ReciboService {
    ReciboDTO obtenerPorId(Long id);
    List<ReciboDTO> listarPorPropiedad(Long propiedadId);
    List<ReciboDTO> listarPorPropietario(Long usuarioId);
    List<ReciboDTO> listarPorEstado(PaymentStatus estado);
}
