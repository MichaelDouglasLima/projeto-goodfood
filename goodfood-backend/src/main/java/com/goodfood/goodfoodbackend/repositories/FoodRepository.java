package com.goodfood.goodfoodbackend.repositories;

import com.goodfood.goodfoodbackend.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository <Food, Long> {
    
}
