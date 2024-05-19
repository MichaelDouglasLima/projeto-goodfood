package com.goodfood.goodfoodbackend.models;

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

    // TODO: adicionar enum para estes campos com possíveis valores
    private String unit;
    private String period;

    @ManyToOne(optional = false)
    @JoinColumn(name = "meal_id")
    private Meal meal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;
}
