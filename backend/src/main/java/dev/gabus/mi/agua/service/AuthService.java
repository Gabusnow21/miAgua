package dev.gabus.mi.agua.service;

import dev.gabus.mi.agua.dto.AuthRequestDTO;
import dev.gabus.mi.agua.dto.AuthResponseDTO;
import dev.gabus.mi.agua.dto.RegisterRequestDTO;

public interface AuthService {
    AuthResponseDTO register(RegisterRequestDTO request);
    AuthResponseDTO authenticate(AuthRequestDTO request);
}
