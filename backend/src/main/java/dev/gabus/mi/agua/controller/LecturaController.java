package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.LecturaDTO;
import dev.gabus.mi.agua.dto.LecturaRequestDTO;
import dev.gabus.mi.agua.service.LecturaService;
import dev.gabus.mi.agua.security.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lecturas")
@RequiredArgsConstructor
public class LecturaController {

    private final LecturaService lecturaService;
    private final SecurityUtils securityUtils;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    public ResponseEntity<LecturaDTO> registrar(@Valid @RequestBody LecturaRequestDTO dto) {
        Long usuarioIdActual = securityUtils.getCurrentUserId();
        return new ResponseEntity<>(lecturaService.registrarLectura(dto, usuarioIdActual), HttpStatus.CREATED);
    }

    @GetMapping("/propiedad/{propiedadId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    public ResponseEntity<List<LecturaDTO>> listarPorPropiedad(@PathVariable Long propiedadId) {
        return ResponseEntity.ok(lecturaService.listarPorPropiedad(propiedadId));
    }

    @GetMapping("/periodo")
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    public ResponseEntity<List<LecturaDTO>> listarPorPeriodo(
            @RequestParam Integer mes, 
            @RequestParam Integer anio) {
        return ResponseEntity.ok(lecturaService.listarPorPeriodo(mes, anio));
    }
}
