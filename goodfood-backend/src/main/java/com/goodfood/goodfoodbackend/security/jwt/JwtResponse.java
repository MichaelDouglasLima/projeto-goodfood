package com.goodfood.goodfoodbackend.security.jwt;

import com.goodfood.goodfoodbackend.models.enums.Role;
import com.goodfood.goodfoodbackend.security.services.UserDetailsImpl;
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

    public JwtResponse(String token, String type, UserDetailsImpl userDetails) {
        this.token = token;
        this.type = type;
        this.id = userDetails.getId();
        this.username = userDetails.getUsername();
        this.email = userDetails.getEmail();
        this.role = userDetails.getRole();
    }

}
