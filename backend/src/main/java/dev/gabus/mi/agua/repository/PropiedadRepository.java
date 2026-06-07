package dev.gabus.mi.agua.repository;

import dev.gabus.mi.agua.model.entity.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropiedadRepository extends JpaRepository<Propiedad, Long> {
    Optional<Propiedad> findByCodigo(String codigo);
    List<Propiedad> findByPropietarioId(Long usuarioId);
    List<Propiedad> findByActivoTrue();
}
