package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.RealMeal;

public interface RealMealRepository extends JpaRepository <RealMeal, Long> {
    
}
