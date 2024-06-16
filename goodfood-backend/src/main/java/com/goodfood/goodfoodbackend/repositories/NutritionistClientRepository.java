package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.NutritionistClient;

public interface NutritionistClientRepository extends JpaRepository <NutritionistClient, Long> {
    
}
