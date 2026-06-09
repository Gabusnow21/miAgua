package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.model.entity.Recibo;
import dev.gabus.mi.agua.model.entity.Usuario;
import dev.gabus.mi.agua.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    @Async
    public void enviarNotificacionNuevoRecibo(Recibo recibo) {
        Usuario vecino = recibo.getLectura().getPropiedad().getPropietario();
        if (vecino.getEmail() == null || vecino.getEmail().isEmpty()) {
            log.warn("El usuario {} no tiene email configurado para notificaciones", vecino.getFullName());
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(vecino.getEmail());
            message.setSubject("Nuevo Recibo de Agua - " + recibo.getLectura().getMes() + "/" + recibo.getLectura().getAnio());
            message.setText(String.format(
                "Hola %s,\n\nSe ha generado un nuevo recibo para su propiedad %s.\n\n" +
                "Detalles:\n" +
                "Periodo: %d/%d\n" +
                "Consumo: %.2f m3\n" +
                "Monto Total: $%.2f\n" +
                "Fecha de Vencimiento: %s\n\n" +
                "Puede realizar su pago a través de la plataforma miAgua.\n\n" +
                "Saludos,\nADESCO miAgua",
                vecino.getFullName(),
                recibo.getLectura().getPropiedad().getCodigo(),
                recibo.getLectura().getMes(),
                recibo.getLectura().getAnio(),
                recibo.getLectura().getConsumo(),
                recibo.getMontoTotal(),
                recibo.getFechaVencimiento().toLocalDate().toString()
            ));

            mailSender.send(message);
            log.info("Email enviado a {} para el recibo {}", vecino.getEmail(), recibo.getId());
        } catch (Exception e) {
            log.error("Error al enviar email a {}: {}", vecino.getEmail(), e.getMessage());
        }
    }

    @Override
    @Async
    public void enviarNotificacionPagoRechazado(Recibo recibo, String motivo) {
        Usuario vecino = recibo.getLectura().getPropiedad().getPropietario();
        if (vecino.getEmail() == null || vecino.getEmail().isEmpty()) {
            log.warn("El usuario {} no tiene email configurado para notificaciones", vecino.getFullName());
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(vecino.getEmail());
            message.setSubject("Pago de Recibo Rechazado - " + recibo.getLectura().getMes() + "/" + recibo.getLectura().getAnio());
            message.setText(String.format(
                "Hola %s,\n\nLe informamos que su pago para el recibo del periodo %d/%d ha sido rechazado.\n\n" +
                "Motivo: %s\n\n" +
                "Por favor, revise los datos de su pago y vuelva a subir el comprobante si es necesario.\n\n" +
                "Saludos,\nADESCO miAgua",
                vecino.getFullName(),
                recibo.getLectura().getMes(),
                recibo.getLectura().getAnio(),
                motivo != null ? motivo : "No especificado"
            ));

            mailSender.send(message);
            log.info("Email de rechazo enviado a {} para el recibo {}", vecino.getEmail(), recibo.getId());
        } catch (Exception e) {
            log.error("Error al enviar email de rechazo a {}: {}", vecino.getEmail(), e.getMessage());
        }
    }
}
