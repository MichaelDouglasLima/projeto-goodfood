package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.Nutritionist;

public interface NutritionistRepository extends JpaRepository <Nutritionist,Integer> {
    
}
