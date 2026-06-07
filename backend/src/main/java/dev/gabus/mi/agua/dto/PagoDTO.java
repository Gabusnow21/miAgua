package dev.gabus.mi.agua.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoDTO {
    private Long id;
    private Long reciboId;
    private Double montoPagado;
    private LocalDateTime fechaPago;
    private String metodoPago;
    private String comprobanteUrl;
    private String referenciaTransaccion;
    private String verificadoPorNombre;
    private LocalDateTime fechaVerificacion;
}
