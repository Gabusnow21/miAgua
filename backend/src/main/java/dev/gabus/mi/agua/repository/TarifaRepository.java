package dev.gabus.mi.agua.repository;

import dev.gabus.mi.agua.model.entity.Tarifa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TarifaRepository extends JpaRepository<Tarifa, Long> {
    Optional<Tarifa> findByActivaTrue();
    List<Tarifa> findAllByOrderByCreatedAtDesc();
}
