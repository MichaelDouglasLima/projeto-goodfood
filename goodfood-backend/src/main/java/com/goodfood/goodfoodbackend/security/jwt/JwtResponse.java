package com.goodfood.goodfoodbackend.security.jwt;

import com.goodfood.goodfoodbackend.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class JwtResponse {

    private String token;
    private String type;
    private Long id;
    private String username;
    private String email;
    private Role role;
}
