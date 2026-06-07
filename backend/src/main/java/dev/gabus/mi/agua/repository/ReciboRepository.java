package dev.gabus.mi.agua.repository;

import dev.gabus.mi.agua.model.entity.Recibo;
import dev.gabus.mi.agua.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReciboRepository extends JpaRepository<Recibo, Long> {
    
    @Query("SELECT r FROM Recibo r JOIN r.lectura l WHERE l.propiedad.id = :propiedadId")
    List<Recibo> findByPropiedadId(Long propiedadId);
    
    @Query("SELECT r FROM Recibo r JOIN r.lectura l WHERE l.propiedad.propietario.id = :usuarioId")
    List<Recibo> findByPropietarioId(Long usuarioId);
    
    List<Recibo> findByEstado(PaymentStatus estado);
    
    Optional<Recibo> findByLecturaId(Long lecturaId);
}
