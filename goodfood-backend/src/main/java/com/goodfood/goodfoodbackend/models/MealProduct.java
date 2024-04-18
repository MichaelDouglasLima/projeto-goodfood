package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_MEAL_PRODUCT")
public class MealProduct {

    @ManyToOne
    @JoinColumn(name = "REAL_MEAL_ID")
    private RealMeal id_realMeal;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product id_product;

    private Double quantity;

    private String period;

    private String unit;

    public MealProduct() {

    }

    public RealMeal getId_realMeal() {
        return id_realMeal;
    }

    public void setId_realMeal(RealMeal id_realMeal) {
        this.id_realMeal = id_realMeal;
    }

    public Product getId_product() {
        return id_product;
    }

    public void setId_product(Product id_product) {
        this.id_product = id_product;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
    
}
