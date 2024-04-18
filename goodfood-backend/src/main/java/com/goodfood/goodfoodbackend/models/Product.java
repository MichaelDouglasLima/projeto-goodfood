package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_PRODUCT")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_diet;

    @Column(nullable = true, length = 1024)
    private String description;

    private Double calories;

    @ManyToMany
    @JoinColumn(name = "CATEGORY_ID")
    private Category category_id;

    public Product() {
        
    }

    public Long getId_diet() {
        return id_diet;
    }

    public void setId_diet(Long id_diet) {
        this.id_diet = id_diet;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public Category getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Category category_id) {
        this.category_id = category_id;
    }
    
}
