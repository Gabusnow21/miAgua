package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.PagoDTO;
import dev.gabus.mi.agua.dto.PagoRequestDTO;
import dev.gabus.mi.agua.service.PagoService;
import dev.gabus.mi.agua.security.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PagoController {

    private final PagoService pagoService;
    private final SecurityUtils securityUtils;

    @PostMapping
    @PreAuthorize("hasRole('VECINO')")
    public ResponseEntity<PagoDTO> registrar(@Valid @RequestBody PagoRequestDTO dto) {
        return new ResponseEntity<>(pagoService.registrarPago(dto), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/verificar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> verificar(
            @PathVariable Long id, 
            @RequestParam boolean aprobado) {
        Long adminIdActual = securityUtils.getCurrentUserId();
        pagoService.verificarPago(id, adminIdActual, aprobado);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/recibo/{reciboId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'VECINO')")
    public ResponseEntity<List<PagoDTO>> listarPorRecibo(@PathVariable Long reciboId) {
        return ResponseEntity.ok(pagoService.listarPorRecibo(reciboId));
    }
}
