package com.goodfood.goodfoodbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goodfood.goodfoodbackend.models.WeeklyLog;

public interface WeeklyLogRepository extends JpaRepository <WeeklyLog, Long>{
    
}
