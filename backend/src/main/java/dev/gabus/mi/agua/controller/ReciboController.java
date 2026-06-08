package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.ReciboDTO;
import dev.gabus.mi.agua.model.enums.PaymentStatus;
import dev.gabus.mi.agua.service.ReciboService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recibos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReciboController {

    private final ReciboService reciboService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'VECINO')")
    public ResponseEntity<ReciboDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(reciboService.obtenerPorId(id));
    }

    @GetMapping("/propiedad/{propiedadId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReciboDTO>> listarPorPropiedad(@PathVariable Long propiedadId) {
        return ResponseEntity.ok(reciboService.listarPorPropiedad(propiedadId));
    }

    @GetMapping("/propietario/{usuarioId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'VECINO')")
    public ResponseEntity<List<ReciboDTO>> listarPorPropietario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(reciboService.listarPorPropietario(usuarioId));
    }

    @GetMapping("/estado/{estado}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReciboDTO>> listarPorEstado(@PathVariable PaymentStatus estado) {
        return ResponseEntity.ok(reciboService.listarPorEstado(estado));
    }
}
