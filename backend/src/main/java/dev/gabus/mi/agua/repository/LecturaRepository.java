package dev.gabus.mi.agua.repository;

import dev.gabus.mi.agua.model.entity.Lectura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LecturaRepository extends JpaRepository<Lectura, Long> {
    List<Lectura> findByPropiedadId(Long propiedadId);
    Optional<Lectura> findTopByPropiedadIdOrderByAnioDescMesDesc(Long propiedadId);
    List<Lectura> findByAnioAndMes(Integer anio, Integer mes);
    boolean existsByPropiedadIdAndAnioAndMes(Long propiedadId, Integer anio, Integer mes);
}
