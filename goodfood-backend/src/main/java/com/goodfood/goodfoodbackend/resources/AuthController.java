package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.dto.LoginRequestDto;
import com.goodfood.goodfoodbackend.dto.SignupRequestDto;
import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.models.enums.Role;
import com.goodfood.goodfoodbackend.repositories.UserRepository;
import com.goodfood.goodfoodbackend.security.jwt.JwtResponse;
import com.goodfood.goodfoodbackend.security.jwt.JwtUtils;
import com.goodfood.goodfoodbackend.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequestDto dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername().substring(0, dto.getUsername().indexOf("@")), dto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(
                new JwtResponse(jwtUtils.generateJwtToken(authentication),
                        "Bearer", userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),
                        userDetails.getRole()));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody SignupRequestDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        if (Role.ADMIN.equals(dto.getRole())) {
            return ResponseEntity.badRequest().body("Error: Not possible to signup as ADMIN!");
        }

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .username(dto.getEmail().substring(0, dto.getEmail().indexOf("@")))
                .password(encoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

}
