package com.goodfood.goodfoodbackend.models;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_SUGGESTED_MEAL")
public class SuggestedMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_suggestedMeal;

    @Column(nullable = false)
    private LocalTime estimatedTime;

    @Column(nullable = true, length = 1024)
    private String comment;

    @OneToOne
    @JoinColumn(name = "DIET_ID")
    private Diet diet_id;

    public SuggestedMeal() {
        
    }

    public Long getId_suggestedMeal() {
        return id_suggestedMeal;
    }

    public void setId_suggestedMeal(Long id_suggestedMeal) {
        this.id_suggestedMeal = id_suggestedMeal;
    }

    public LocalTime getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(LocalTime estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Diet getDiet_id() {
        return diet_id;
    }

    public void setDiet_id(Diet diet_id) {
        this.diet_id = diet_id;
    }

}
