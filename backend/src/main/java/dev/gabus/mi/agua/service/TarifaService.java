package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.dto.TarifaDTO;
import java.util.List;

public interface TarifaService {
    TarifaDTO crearTarifa(TarifaDTO tarifaDTO);
    TarifaDTO obtenerTarifaActiva();
    List<TarifaDTO> listarTodas();
    void activarTarifa(Long id);
}
