package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.dto.LecturaDTO;
import dev.gabus.mi.agua.dto.LecturaRequestDTO;
import dev.gabus.mi.agua.exception.ResourceNotFoundException;
import dev.gabus.mi.agua.model.entity.*;
import dev.gabus.mi.agua.model.enums.PaymentStatus;
import dev.gabus.mi.agua.repository.*;
import dev.gabus.mi.agua.service.LecturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LecturaServiceImpl implements LecturaService {

    private final LecturaRepository lecturaRepository;
    private final PropiedadRepository propiedadRepository;
    private final UsuarioRepository usuarioRepository;
    private final TarifaRepository tarifaRepository;
    private final ReciboRepository reciboRepository;

    @Override
    @Transactional
    public LecturaDTO registrarLectura(LecturaRequestDTO dto, Long usuarioId) {
        Propiedad propiedad = propiedadRepository.findById(dto.getPropiedadId())
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada"));

        Usuario registradoPor = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        // Obtener lectura anterior para calcular consumo
        Double lecturaAnterior = lecturaRepository.findTopByPropiedadIdOrderByAnioDescMesDesc(propiedad.getId())
                .map(Lectura::getLecturaActual)
                .orElse(0.0);

        if (dto.getLecturaActual() < lecturaAnterior) {
            throw new IllegalArgumentException("La lectura actual no puede ser menor a la anterior: " + lecturaAnterior);
        }

        Double consumo = dto.getLecturaActual() - lecturaAnterior;

        Lectura lectura = Lectura.builder()
                .propiedad(propiedad)
                .lecturaAnterior(lecturaAnterior)
                .lecturaActual(dto.getLecturaActual())
                .consumo(consumo)
                .mes(dto.getMes())
                .anio(dto.getAnio())
                .fechaLectura(LocalDateTime.now())
                .registradoPor(registradoPor)
                .observaciones(dto.getObservaciones())
                .build();

        Lectura savedLectura = lecturaRepository.save(lectura);

        // Generar Recibo automáticamente
        generarRecibo(savedLectura);

        return mapToDTO(savedLectura);
    }

    private void generarRecibo(Lectura lectura) {
        Tarifa tarifaActiva = tarifaRepository.findByActivaTrue()
                .orElseThrow(() -> new ResourceNotFoundException("No hay una tarifa activa configurada"));

        Double montoTotal = tarifaActiva.getCuotaFija() + (lectura.getConsumo() * tarifaActiva.getPrecioMetroCubico());

        Recibo recibo = Recibo.builder()
                .lectura(lectura)
                .tarifa(tarifaActiva)
                .montoTotal(montoTotal)
                .fechaVencimiento(LocalDateTime.now().plusDays(15)) // 15 días para pagar
                .estado(PaymentStatus.PENDIENTE)
                .build();

        reciboRepository.save(recibo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LecturaDTO> listarPorPropiedad(Long propiedadId) {
        return lecturaRepository.findByPropiedadId(propiedadId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LecturaDTO> listarPorPeriodo(Integer mes, Integer anio) {
        return lecturaRepository.findByAnioAndMes(anio, mes).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private LecturaDTO mapToDTO(Lectura lectura) {
        return LecturaDTO.builder()
                .id(lectura.getId())
                .propiedadId(lectura.getPropiedad().getId())
                .codigoPropiedad(lectura.getPropiedad().getCodigo())
                .lecturaAnterior(lectura.getLecturaAnterior())
                .lecturaActual(lectura.getLecturaActual())
                .consumo(lectura.getConsumo())
                .mes(lectura.getMes())
                .anio(lectura.getAnio())
                .fechaLectura(lectura.getFechaLectura())
                .registradoPorNombre(lectura.getRegistradoPor().getFullName())
                .observaciones(lectura.getObservaciones())
                .build();
    }
}
