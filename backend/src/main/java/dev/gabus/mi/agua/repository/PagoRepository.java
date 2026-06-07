package dev.gabus.mi.agua.repository;

import dev.gabus.mi.agua.model.entity.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByReciboId(Long reciboId);
}
