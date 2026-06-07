package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.LecturaDTO;
import dev.gabus.mi.agua.dto.LecturaRequestDTO;
import dev.gabus.mi.agua.service.LecturaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lecturas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LecturaController {

    private final LecturaService lecturaService;

    @PostMapping
    public ResponseEntity<LecturaDTO> registrar(@Valid @RequestBody LecturaRequestDTO dto) {
        // TODO: Obtener el usuarioId del contexto de seguridad una vez implementado JWT
        // Por ahora usamos un ID temporal para pruebas o lo pedimos en el DTO si es necesario
        Long usuarioIdActual = 1L; 
        return new ResponseEntity<>(lecturaService.registrarLectura(dto, usuarioIdActual), HttpStatus.CREATED);
    }

    @GetMapping("/propiedad/{propiedadId}")
    public ResponseEntity<List<LecturaDTO>> listarPorPropiedad(@PathVariable Long propiedadId) {
        return ResponseEntity.ok(lecturaService.listarPorPropiedad(propiedadId));
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<LecturaDTO>> listarPorPeriodo(
            @RequestParam Integer mes, 
            @RequestParam Integer anio) {
        return ResponseEntity.ok(lecturaService.listarPorPeriodo(mes, anio));
    }
}
