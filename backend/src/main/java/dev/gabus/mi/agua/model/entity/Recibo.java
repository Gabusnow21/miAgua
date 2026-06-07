package dev.gabus.mi.agua.model.entity;

import dev.gabus.mi.agua.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "recibos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recibo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lectura_id", nullable = false)
    private Lectura lectura;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tarifa_id", nullable = false)
    private Tarifa tarifa;

    @Column(name = "monto_total", nullable = false)
    private Double montoTotal;

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDateTime fechaVencimiento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus estado;

    @CreationTimestamp
    @Column(name = "fecha_emision", updatable = false)
    private LocalDateTime fechaEmision;

    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime updatedAt;
}
