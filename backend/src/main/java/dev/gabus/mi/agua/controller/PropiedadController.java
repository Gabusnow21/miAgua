package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.PropiedadDTO;
import dev.gabus.mi.agua.service.PropiedadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/propiedades")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Ajustar según necesidad del frontend
public class PropiedadController {

    private final PropiedadService propiedadService;

    @PostMapping
    public ResponseEntity<PropiedadDTO> crear(@Valid @RequestBody PropiedadDTO dto) {
        return new ResponseEntity<>(propiedadService.crearPropiedad(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropiedadDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(propiedadService.obtenerPorId(id));
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<PropiedadDTO> obtenerPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(propiedadService.obtenerPorCodigo(codigo));
    }

    @GetMapping
    public ResponseEntity<List<PropiedadDTO>> listarTodas() {
        return ResponseEntity.ok(propiedadService.listarTodas());
    }

    @GetMapping("/propietario/{usuarioId}")
    public ResponseEntity<List<PropiedadDTO>> listarPorPropietario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(propiedadService.listarPorPropietario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropiedadDTO> actualizar(@PathVariable Long id, @Valid @RequestBody PropiedadDTO dto) {
        return ResponseEntity.ok(propiedadService.actualizarPropiedad(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        propiedadService.eliminarPropiedad(id);
        return ResponseEntity.noContent().build();
    }
}
