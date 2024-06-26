package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

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

    @OneToOne(optional = true)
    private Diet diet;

    //TODO Não entendi o papel deste atributo
    // @ManyToMany(mappedBy = "meals")
    // private List<Diet> diets;

    //TODO acho que o correto seria uma lista disso aqui.
    //TODO cada refeição sugerida teria vários desse aqui, que seria cada item da tabela.
    // @ManyToMany(mappedBy = "meals")
    // private List<MealProduct> mealProducts;
}
