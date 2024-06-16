package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.Diet;

public interface DietRepository extends JpaRepository <Diet, Long> {
    
}
