package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.Client;

public interface ClientRepository extends JpaRepository <Client, Long> {
    
}
