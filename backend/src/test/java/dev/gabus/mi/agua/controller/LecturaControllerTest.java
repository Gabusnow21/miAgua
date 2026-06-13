package dev.gabus.mi.agua.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gabus.mi.agua.dto.LecturaDTO;
import dev.gabus.mi.agua.dto.LecturaRequestDTO;
import dev.gabus.mi.agua.security.SecurityUtils;
import dev.gabus.mi.agua.service.LecturaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LecturaController.class)
@AutoConfigureMockMvc
class LecturaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private LecturaService lecturaService;

    @MockitoBean
    private SecurityUtils securityUtils;

    @MockitoBean
    private dev.gabus.mi.agua.security.JwtUtils jwtUtils;

    @MockitoBean
    private org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "OPERADOR")
    void registrarLectura_ReturnsCreated() throws Exception {
        // Arrange
        LecturaRequestDTO requestDTO = new LecturaRequestDTO();
        requestDTO.setPropiedadId(1L);
        requestDTO.setLecturaActual(100.0);
        requestDTO.setMes(6);
        requestDTO.setAnio(2026);

        LecturaDTO responseDTO = LecturaDTO.builder()
                .id(1L)
                .lecturaActual(100.0)
                .build();

        when(securityUtils.getCurrentUserId()).thenReturn(1L);
        when(lecturaService.registrarLectura(any(LecturaRequestDTO.class), eq(1L))).thenReturn(responseDTO);

        // Act & Assert
        mockMvc.perform(post("/api/lecturas")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.lecturaActual").value(100.0));
    }

    @Test
    @WithMockUser(roles = "OPERADOR")
    void listarPorPropiedad_ReturnsOk() throws Exception {
        // Arrange
        LecturaDTO lectura = LecturaDTO.builder().id(1L).build();
        when(lecturaService.listarPorPropiedad(1L)).thenReturn(List.of(lectura));

        // Act & Assert
        mockMvc.perform(get("/api/lecturas/propiedad/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L));
    }

    @Test
    void registrarLectura_Unauthorized_WhenNotLoggedIn() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/api/lecturas")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnauthorized()); 
    }
}
