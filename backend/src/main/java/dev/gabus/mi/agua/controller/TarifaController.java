package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.TarifaDTO;
import dev.gabus.mi.agua.service.TarifaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarifas")
@RequiredArgsConstructor
public class TarifaController {

    private final TarifaService tarifaService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TarifaDTO> crear(@Valid @RequestBody TarifaDTO dto) {
        return new ResponseEntity<>(tarifaService.crearTarifa(dto), HttpStatus.CREATED);
    }

    @GetMapping("/activa")
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR', 'VECINO')")
    public ResponseEntity<TarifaDTO> obtenerActiva() {
        return ResponseEntity.ok(tarifaService.obtenerTarifaActiva());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TarifaDTO>> listarTodas() {
        return ResponseEntity.ok(tarifaService.listarTodas());
    }

    @PatchMapping("/{id}/activar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> activar(@PathVariable Long id) {
        tarifaService.activarTarifa(id);
        return ResponseEntity.ok().build();
    }
}
