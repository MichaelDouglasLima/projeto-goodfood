package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.Product;

public interface ProductRepository extends JpaRepository <Product, Long> {
    
}
