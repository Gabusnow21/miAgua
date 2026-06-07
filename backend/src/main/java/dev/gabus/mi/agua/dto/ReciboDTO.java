package dev.gabus.mi.agua.dto;

import dev.gabus.mi.agua.model.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReciboDTO {
    private Long id;
    private Long lecturaId;
    private String codigoPropiedad;
    private String nombrePropietario;
    private Double consumo;
    private Double montoTotal;
    private LocalDateTime fechaVencimiento;
    private PaymentStatus estado;
    private LocalDateTime fechaEmision;
    private Integer mes;
    private Integer anio;
}
