package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_DIET_MEAL")
public class Diet_Meal {

    @OneToOne
    @JoinColumn(name = "ID_DIET")
    private Diet id_diet;

    @OneToOne
    @JoinColumn(name = "ID_MEAL")
    private Meal id_Meal;

    public Diet_Meal() {
        
    }

    public Diet getId_diet() {
        return id_diet;
    }

    public void setId_diet(Diet id_diet) {
        this.id_diet = id_diet;
    }

    public Meal getId_Meal() {
        return id_Meal;
    }

    public void setId_Meal(Meal id_Meal) {
        this.id_Meal = id_Meal;
    }
    
}
