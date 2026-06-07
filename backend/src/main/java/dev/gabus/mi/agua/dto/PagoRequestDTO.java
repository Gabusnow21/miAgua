package dev.gabus.mi.agua.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PagoRequestDTO {
    @NotNull(message = "El recibo es obligatorio")
    private Long reciboId;

    @NotNull(message = "El monto pagado es obligatorio")
    @Positive(message = "El monto debe ser mayor a cero")
    private Double montoPagado;

    @NotBlank(message = "El método de pago es obligatorio")
    private String metodoPago;

    private String referenciaTransaccion;
    
    // En una implementación real, aquí se recibiría un MultipartFile para el comprobante.
    // Para el DTO de request, podríamos manejar solo el nombre o esperar a que el service lo procese.
    private String comprobanteUrl;
}
