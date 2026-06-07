package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.dto.PropiedadDTO;
import dev.gabus.mi.agua.exception.ResourceNotFoundException;
import dev.gabus.mi.agua.model.entity.Propiedad;
import dev.gabus.mi.agua.model.entity.Usuario;
import dev.gabus.mi.agua.repository.PropiedadRepository;
import dev.gabus.mi.agua.repository.UsuarioRepository;
import dev.gabus.mi.agua.service.PropiedadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropiedadServiceImpl implements PropiedadService {

    private final PropiedadRepository propiedadRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public PropiedadDTO crearPropiedad(PropiedadDTO dto) {
        Usuario propietario = usuarioRepository.findById(dto.getPropietarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + dto.getPropietarioId()));

        Propiedad propiedad = Propiedad.builder()
                .codigo(dto.getCodigo())
                .direccion(dto.getDireccion())
                .propietario(propietario)
                .activo(true)
                .build();

        return mapToDTO(propiedadRepository.save(propiedad));
    }

    @Override
    @Transactional(readOnly = true)
    public PropiedadDTO obtenerPorId(Long id) {
        return propiedadRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada con id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public PropiedadDTO obtenerPorCodigo(String codigo) {
        return propiedadRepository.findByCodigo(codigo)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada con código: " + codigo));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropiedadDTO> listarTodas() {
        return propiedadRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropiedadDTO> listarPorPropietario(Long usuarioId) {
        return propiedadRepository.findByPropietarioId(usuarioId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PropiedadDTO actualizarPropiedad(Long id, PropiedadDTO dto) {
        Propiedad propiedad = propiedadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada con id: " + id));

        Usuario propietario = usuarioRepository.findById(dto.getPropietarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + dto.getPropietarioId()));

        propiedad.setCodigo(dto.getCodigo());
        propiedad.setDireccion(dto.getDireccion());
        propiedad.setPropietario(propietario);
        propiedad.setActivo(dto.isActivo());

        return mapToDTO(propiedadRepository.save(propiedad));
    }

    @Override
    @Transactional
    public void eliminarPropiedad(Long id) {
        Propiedad propiedad = propiedadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Propiedad no encontrada con id: " + id));
        propiedad.setActivo(false);
        propiedadRepository.save(propiedad);
    }

    private PropiedadDTO mapToDTO(Propiedad propiedad) {
        return PropiedadDTO.builder()
                .id(propiedad.getId())
                .codigo(propiedad.getCodigo())
                .direccion(propiedad.getDireccion())
                .propietarioId(propiedad.getPropietario().getId())
                .nombrePropietario(propiedad.getPropietario().getFullName())
                .activo(propiedad.isActivo())
                .build();
    }
}
