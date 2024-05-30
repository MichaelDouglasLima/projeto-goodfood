package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.dto.LoginRequestDto;
import com.goodfood.goodfoodbackend.dto.SignupRequestDto;
import com.goodfood.goodfoodbackend.security.jwt.JwtResponse;
import com.goodfood.goodfoodbackend.services.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Signup and login")
@CrossOrigin
public class AuthController {

    private final AuthService service;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok(
                service.authenticateUser(dto));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody SignupRequestDto dto) {
        service.registerUser(dto);
        return ResponseEntity.ok().build();
    }

}
