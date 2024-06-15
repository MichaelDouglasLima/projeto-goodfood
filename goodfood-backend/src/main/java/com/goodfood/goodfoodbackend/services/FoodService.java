package com.goodfood.goodfoodbackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.goodfood.goodfoodbackend.models.Food;
import com.goodfood.goodfoodbackend.repositories.FoodRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public Food save(Food food) {
        return foodRepository.save(food);
    }

    public Food getById(long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Food not found"));
    }

    public List<Food> getAll() {
        return foodRepository.findAll();
    }

    public void update(long id, Food foodUpdate) {
        Food food = getById(id);
        food.setDescription(foodUpdate.getDescription());
        foodRepository.save(food);
    }

    public void deleteById(long id) {
        Food food = getById(id);
        foodRepository.delete(food);
    }
    
}
