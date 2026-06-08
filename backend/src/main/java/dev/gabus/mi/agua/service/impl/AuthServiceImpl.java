package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.dto.AuthRequestDTO;
import dev.gabus.mi.agua.dto.AuthResponseDTO;
import dev.gabus.mi.agua.dto.RegisterRequestDTO;
import dev.gabus.mi.agua.model.entity.Usuario;
import dev.gabus.mi.agua.repository.UsuarioRepository;
import dev.gabus.mi.agua.security.JwtUtils;
import dev.gabus.mi.agua.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    @Override
    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Usuario usuario = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .fullName(request.getFullName())
                .role(request.getRole())
                .enabled(true)
                .build();

        usuarioRepository.save(usuario);

        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getUsername());
        String jwtToken = jwtUtils.generateToken(userDetails);

        return AuthResponseDTO.builder()
                .token(jwtToken)
                .username(usuario.getUsername())
                .role(usuario.getRole().name())
                .build();
    }

    @Override
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow();

        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getUsername());
        String jwtToken = jwtUtils.generateToken(userDetails);

        return AuthResponseDTO.builder()
                .token(jwtToken)
                .username(usuario.getUsername())
                .role(usuario.getRole().name())
                .build();
    }
}
