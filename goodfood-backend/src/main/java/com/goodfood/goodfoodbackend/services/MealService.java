package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Meal;
import com.goodfood.goodfoodbackend.repositories.MealRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MealService {

    private final MealRepository mealRepository;

    public Meal save(Meal meal) {
        return mealRepository.save(meal);
    }

    public Meal getById(long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meal not found"));
    }

    public List<Meal> getAll() {
        return mealRepository.findAll();
    }

    public void update(long id, Meal mealUpdate) {
        Meal meal = getById(id);

        meal.setEstimatedTime(mealUpdate.getEstimatedTime());
        meal.setComment(mealUpdate.getComment());
        meal.setPeriod(mealUpdate.getPeriod());
        // meal.setDiets(mealUpdate.getDiets()); // Ainda não entendi este atributo

        mealRepository.save(meal);
    }

    public void deleteById(long id) {
        Meal meal = getById(id);
        mealRepository.delete(meal);
    } 
}
