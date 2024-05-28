package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.Category;

public interface CategoryRepository extends JpaRepository <Category, Long> {
    
}
