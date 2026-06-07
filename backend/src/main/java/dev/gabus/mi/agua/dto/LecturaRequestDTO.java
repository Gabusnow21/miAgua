package dev.gabus.mi.agua.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class LecturaRequestDTO {
    @NotNull(message = "La propiedad es obligatoria")
    private Long propiedadId;

    @NotNull(message = "La lectura actual es obligatoria")
    @PositiveOrZero(message = "La lectura debe ser un valor positivo")
    private Double lecturaActual;

    @NotNull(message = "El mes es obligatorio")
    private Integer mes;

    @NotNull(message = "El año es obligatorio")
    private Integer anio;

    private String observaciones;
}
