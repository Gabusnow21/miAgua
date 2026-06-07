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
public class LecturaDTO {
    private Long id;
    private Long propiedadId;
    private String codigoPropiedad;
    private Double lecturaAnterior;
    private Double lecturaActual;
    private Double consumo;
    private Integer mes;
    private Integer anio;
    private LocalDateTime fechaLectura;
    private String registradoPorNombre;
    private String observaciones;
}
