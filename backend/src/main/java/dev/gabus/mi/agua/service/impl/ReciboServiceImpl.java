package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.dto.ReciboDTO;
import dev.gabus.mi.agua.exception.ResourceNotFoundException;
import dev.gabus.mi.agua.model.entity.Recibo;
import dev.gabus.mi.agua.model.enums.PaymentStatus;
import dev.gabus.mi.agua.repository.ReciboRepository;
import dev.gabus.mi.agua.service.ReciboService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReciboServiceImpl implements ReciboService {

    private final ReciboRepository reciboRepository;

    @Override
    @Transactional(readOnly = true)
    public ReciboDTO obtenerPorId(Long id) {
        return reciboRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Recibo no encontrado con id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReciboDTO> listarPorPropiedad(Long propiedadId) {
        return reciboRepository.findByPropiedadId(propiedadId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReciboDTO> listarPorPropietario(Long usuarioId) {
        return reciboRepository.findByPropietarioId(usuarioId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReciboDTO> listarPorEstado(PaymentStatus estado) {
        return reciboRepository.findByEstado(estado).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ReciboDTO mapToDTO(Recibo recibo) {
        return ReciboDTO.builder()
                .id(recibo.getId())
                .lecturaId(recibo.getLectura().getId())
                .codigoPropiedad(recibo.getLectura().getPropiedad().getCodigo())
                .nombrePropietario(recibo.getLectura().getPropiedad().getPropietario().getFullName())
                .consumo(recibo.getLectura().getConsumo())
                .montoTotal(recibo.getMontoTotal())
                .fechaVencimiento(recibo.getFechaVencimiento())
                .estado(recibo.getEstado())
                .fechaEmision(recibo.getFechaEmision())
                .mes(recibo.getLectura().getMes())
                .anio(recibo.getLectura().getAnio())
                .build();
    }
}
