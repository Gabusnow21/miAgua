package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.dto.LecturaDTO;
import dev.gabus.mi.agua.dto.LecturaRequestDTO;
import java.util.List;

public interface LecturaService {
    LecturaDTO registrarLectura(LecturaRequestDTO lecturaRequestDTO, Long usuarioId);
    List<LecturaDTO> listarPorPropiedad(Long propiedadId);
    List<LecturaDTO> listarPorPeriodo(Integer mes, Integer anio);
}
