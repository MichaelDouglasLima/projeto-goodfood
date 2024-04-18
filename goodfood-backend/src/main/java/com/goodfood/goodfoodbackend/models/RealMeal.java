package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_REAL_MEAL")
public class RealMeal {
    
    @OneToOne
    @JoinColumn(name = "SUGGESTED_MEAL_ID")
    private SuggestedMeal id_suggestedMeal;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product id_product;

    private String realQuantity;

    private String unit;

    public RealMeal() {
        
    }

    public SuggestedMeal getId_suggestedMeal() {
        return id_suggestedMeal;
    }

    public void setId_suggestedMeal(SuggestedMeal id_suggestedMeal) {
        this.id_suggestedMeal = id_suggestedMeal;
    }

    public Product getId_product() {
        return id_product;
    }

    public void setId_product(Product id_product) {
        this.id_product = id_product;
    }

    public String getTrueQuantity() {
        return realQuantity;
    }

    public void setTrueQuantity(String trueQuantity) {
        this.realQuantity = trueQuantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

}
