package com.goodfood.goodfoodbackend.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class UserDetailsImpl implements UserDetails {

    @Serial
    private static final long serialVersionUID = 1L;

    private final Long id;
    private final String email;
    private final String username;

    @JsonIgnore
    private final String password;

    private final Role role;

    public static UserDetailsImpl build(User user) {
        return new UserDetailsImpl(
                user.getId(), user.getEmail(), user.getUsername(), user.getPassword(), user.getRole());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
