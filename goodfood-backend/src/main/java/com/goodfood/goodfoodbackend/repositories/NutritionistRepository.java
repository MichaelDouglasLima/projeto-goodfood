package com.goodfood.goodfoodbackend.repositories;

import com.goodfood.goodfoodbackend.models.Nutritionist;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NutritionistRepository extends JpaRepository<Nutritionist, Long> {

    Nutritionist findByUserId(long userId);
}
