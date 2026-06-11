package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.AuthRequestDTO;
import dev.gabus.mi.agua.dto.AuthResponseDTO;
import dev.gabus.mi.agua.dto.RegisterRequestDTO;
import dev.gabus.mi.agua.service.AuthService;
import dev.gabus.mi.agua.security.JwtUtils; // Importar JwtUtils
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtils jwtUtils; // Inyectar JwtUtils
    private final UserDetailsService userDetailsService; // Inyectar UserDetailsService

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO request,
            HttpServletResponse response
    ) {
        AuthResponseDTO authResponse = authService.register(request);
        setCookie(response, authResponse.getToken());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticate(
            @Valid @RequestBody AuthRequestDTO request,
            HttpServletResponse response
    ) {
        AuthResponseDTO authResponse = authService.authenticate(request);
        setCookie(response, authResponse.getToken());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false) // Debería ser true en producción
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    private void setCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false) // Configurar en true para producción con HTTPS
                .path("/")
                .maxAge(86400) // 24 horas
                .sameSite("Strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
