package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.model.entity.Usuario;
import java.util.List;

public interface UsuarioService {
    List<Usuario> listarTodos();
    Usuario obtenerPorId(Long id);
    Usuario crear(Usuario usuario);
    Usuario actualizar(Long id, Usuario usuario);
    void eliminar(Long id);
}
