package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.MealProduct;

public interface MealProductRepository extends JpaRepository <MealProduct, Long>{
    
}
