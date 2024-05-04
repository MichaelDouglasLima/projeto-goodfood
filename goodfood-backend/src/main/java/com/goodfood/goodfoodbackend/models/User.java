package com.goodfood.goodfoodbackend.models;

import com.goodfood.goodfoodbackend.models.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
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

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 24)
    private String phoneNumber;

    @Column(length = 1024)
    private String description;

    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;
}
