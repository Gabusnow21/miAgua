package dev.gabus.mi.agua.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropiedadDTO {
    private Long id;
    private String codigo;
    private String direccion;
    private Long propietarioId;
    private String nombrePropietario;
    private boolean activo;
}
