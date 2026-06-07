package dev.gabus.mi.agua.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "lecturas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lectura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propiedad_id", nullable = false)
    private Propiedad propiedad;

    @Column(name = "lectura_anterior", nullable = false)
    private Double lecturaAnterior;

    @Column(name = "lectura_actual", nullable = false)
    private Double lecturaActual;

    @Column(nullable = false)
    private Double consumo;

    @Column(nullable = false)
    private Integer mes;

    @Column(nullable = false)
    private Integer anio;

    @Column(name = "fecha_lectura", nullable = false)
    private LocalDateTime fechaLectura;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario registradoPor;

    @Column(length = 500)
    private String observaciones;

    @CreationTimestamp
    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime createdAt;
}
