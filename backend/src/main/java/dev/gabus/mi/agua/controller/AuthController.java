package dev.gabus.mi.agua.controller;

import dev.gabus.mi.agua.dto.AuthRequestDTO;
import dev.gabus.mi.agua.dto.AuthResponseDTO;
import dev.gabus.mi.agua.dto.RegisterRequestDTO;
import dev.gabus.mi.agua.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticate(
            @Valid @RequestBody AuthRequestDTO request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
