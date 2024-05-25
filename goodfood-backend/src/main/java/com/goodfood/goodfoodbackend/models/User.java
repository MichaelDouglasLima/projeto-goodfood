package com.goodfood.goodfoodbackend.models;

import com.goodfood.goodfoodbackend.models.enums.Gender;
import com.goodfood.goodfoodbackend.models.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(length = 24)
    private String phoneNumber;

    @Column(length = 1024)
    private String description;

    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;
}
