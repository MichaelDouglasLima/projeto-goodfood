package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.Meal;

public interface MealRepository extends JpaRepository <Meal, Long> {
    
}
