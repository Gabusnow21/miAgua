package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.dto.PropiedadDTO;
import java.util.List;

public interface PropiedadService {
    PropiedadDTO crearPropiedad(PropiedadDTO propiedadDTO);
    PropiedadDTO obtenerPorId(Long id);
    PropiedadDTO obtenerPorCodigo(String codigo);
    List<PropiedadDTO> listarTodas();
    List<PropiedadDTO> listarPorPropietario(Long usuarioId);
    PropiedadDTO actualizarPropiedad(Long id, PropiedadDTO propiedadDTO);
    void eliminarPropiedad(Long id);
}
