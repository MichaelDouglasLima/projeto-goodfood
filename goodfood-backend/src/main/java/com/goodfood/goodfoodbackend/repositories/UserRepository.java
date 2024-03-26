package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.goodfood.goodfoodbackend.models.User;

public interface UserRepository extends JpaRepository <User,Integer> {
    
}
