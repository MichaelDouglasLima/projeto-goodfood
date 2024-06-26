package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import com.goodfood.goodfoodbackend.models.enums.Period;

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
    private String comment;

    @Enumerated(EnumType.STRING)
    private Period period;

    @ManyToOne(optional = false)
    private Diet diet;

    // @ManyToMany(mappedBy = "meals")
    // private List<Diet> diets;

    // @ManyToMany(mappedBy = "meals")
    // private List<MealProduct> mealProducts;
}
