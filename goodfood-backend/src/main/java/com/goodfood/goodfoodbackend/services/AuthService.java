package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.dto.LoginRequestDto;
import com.goodfood.goodfoodbackend.dto.SignupRequestDto;
import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.models.enums.Role;
import com.goodfood.goodfoodbackend.repositories.UserRepository;
import com.goodfood.goodfoodbackend.security.jwt.JwtResponse;
import com.goodfood.goodfoodbackend.security.jwt.JwtUtils;
import com.goodfood.goodfoodbackend.security.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public JwtResponse authenticateUser(LoginRequestDto dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername().substring(0, dto.getUsername().indexOf("@")), dto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new JwtResponse(jwtUtils.generateJwtToken(authentication), "Bearer", userDetails);
    }

    public void registerUser(SignupRequestDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Error: Email is already in use!");
        }

        if (Role.ADMIN.equals(dto.getRole())) {
            throw new IllegalArgumentException("Error: Not possible to signup as ADMIN!");
        }

        userRepository.save(
                User.builder()
                        .name(dto.getName())
                        .email(dto.getEmail())
                        .username(dto.getEmail().substring(0, dto.getEmail().indexOf("@")))
                        .password(encoder.encode(dto.getPassword()))
                        .role(dto.getRole())
                        .build());
    }

}
