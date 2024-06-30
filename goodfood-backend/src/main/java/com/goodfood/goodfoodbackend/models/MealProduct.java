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

    @Column(length = 1024)
    private String description;

    private Double calories;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToOne(optional = true)
    @JoinColumn(name = "meal_id")
    private Meal meal;

    // @ManyToOne(optional = false)
    // @JoinColumn(name = "product_id")
    // private Product product;

}
