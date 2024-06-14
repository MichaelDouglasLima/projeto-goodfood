package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "meal")
public class Meal {

    // Esta Classe é o equivalente a Refeição Real no DER

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalTime estimatedTime;

    @Column(length = 1024)
    private String description; // O nome deste atributo no DER é comment

    private String period;

    @ManyToMany(mappedBy = "meals")
    private List<Diet> diets; // Não entendi o papel deste atributo
}
