package com.goodfood.goodfoodbackend.models;

import com.goodfood.goodfoodbackend.models.enums.Unit;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "meal_product")
public class MealProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double quantity;

    @Enumerated(EnumType.STRING)
    private Unit unit;

    @ManyToOne(optional = false)
    @JoinColumn(name = "meal_id")
    private Meal meal;

    //TODO deixar um produto aqui vai deixar a lógica mais complicada
    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    //TODO Poderiamos deixar apenas os atributos de Product aqui
    // @Column(length = 1024)
    // private String description;

    // private Double calories;

    // @ManyToOne(optional = false)
    // @JoinColumn(name = "category_id")
    // private Category category;

    //TODO desse jeito cada MealProduct já seria um item da tabela
}
