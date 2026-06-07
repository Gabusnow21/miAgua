package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.dto.TarifaDTO;
import dev.gabus.mi.agua.exception.ResourceNotFoundException;
import dev.gabus.mi.agua.model.entity.Tarifa;
import dev.gabus.mi.agua.repository.TarifaRepository;
import dev.gabus.mi.agua.service.TarifaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TarifaServiceImpl implements TarifaService {

    private final TarifaRepository tarifaRepository;

    @Override
    @Transactional
    public TarifaDTO crearTarifa(TarifaDTO dto) {
        Tarifa tarifa = Tarifa.builder()
                .nombre(dto.getNombre())
                .cuotaFija(dto.getCuotaFija())
                .precioMetroCubico(dto.getPrecioMetroCubico())
                .activa(false) // Por defecto se crea inactiva
                .build();
        
        return mapToDTO(tarifaRepository.save(tarifa));
    }

    @Override
    @Transactional(readOnly = true)
    public TarifaDTO obtenerTarifaActiva() {
        return tarifaRepository.findByActivaTrue()
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("No hay ninguna tarifa activa"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<TarifaDTO> listarTodas() {
        return tarifaRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void activarTarifa(Long id) {
        // Desactivar la tarifa actual
        tarifaRepository.findByActivaTrue().ifPresent(t -> {
            t.setActiva(false);
            tarifaRepository.save(t);
        });

        // Activar la nueva
        Tarifa nueva = tarifaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarifa no encontrada"));
        nueva.setActiva(true);
        tarifaRepository.save(nueva);
    }

    private TarifaDTO mapToDTO(Tarifa tarifa) {
        return TarifaDTO.builder()
                .id(tarifa.getId())
                .nombre(tarifa.getNombre())
                .cuotaFija(tarifa.getCuotaFija())
                .precioMetroCubico(tarifa.getPrecioMetroCubico())
                .activa(tarifa.isActiva())
                .build();
    }
}
