package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.Request;

public interface RequestRepository extends JpaRepository <Request, Long>{
    
}
