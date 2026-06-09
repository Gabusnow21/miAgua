package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.model.entity.Recibo;

public interface NotificationService {
    void enviarNotificacionNuevoRecibo(Recibo recibo);
    void enviarNotificacionPagoRechazado(Recibo recibo, String motivo);
}
