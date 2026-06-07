package dev.gabus.mi.agua.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "pagos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recibo_id", nullable = false)
    private Recibo recibo;

    @Column(name = "monto_pagado", nullable = false)
    private Double montoPagado;

    @Column(name = "fecha_pago", nullable = false)
    private LocalDateTime fechaPago;

    @Column(name = "metodo_pago", nullable = false, length = 50)
    private String metodoPago;

    @Column(name = "comprobante_url")
    private String comprobanteUrl;

    @Column(name = "referencia_transaccion", length = 100)
    private String referenciaTransaccion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verificado_por")
    private Usuario verificadoPor;

    @Column(name = "fecha_verificacion")
    private LocalDateTime fechaVerificacion;

    @CreationTimestamp
    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime createdAt;
}
