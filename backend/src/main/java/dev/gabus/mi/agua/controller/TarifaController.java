package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.TarifaDTO;
import dev.gabus.mi.agua.service.TarifaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarifas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TarifaController {

    private final TarifaService tarifaService;

    @PostMapping
    public ResponseEntity<TarifaDTO> crear(@Valid @RequestBody TarifaDTO dto) {
        return new ResponseEntity<>(tarifaService.crearTarifa(dto), HttpStatus.CREATED);
    }

    @GetMapping("/activa")
    public ResponseEntity<TarifaDTO> obtenerActiva() {
        return ResponseEntity.ok(tarifaService.obtenerTarifaActiva());
    }

    @GetMapping
    public ResponseEntity<List<TarifaDTO>> listarTodas() {
        return ResponseEntity.ok(tarifaService.listarTodas());
    }

    @PatchMapping("/{id}/activar")
    public ResponseEntity<Void> activar(@PathVariable Long id) {
        tarifaService.activarTarifa(id);
        return ResponseEntity.ok().build();
    }
}
