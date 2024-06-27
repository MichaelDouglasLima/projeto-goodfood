package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.RealMeal;
import com.goodfood.goodfoodbackend.repositories.RealMealRepository;
import com.goodfood.goodfoodbackend.models.Diet;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class RealMealService {

    private final RealMealRepository realMealRepository;

    private final DietService dietService;

    public RealMeal save(RealMeal realMeal) {
        return realMealRepository.save(realMeal);
    }

    public RealMeal getById(long id) {
        return realMealRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("RealMeal not found"));
    }

    public List<RealMeal> getAll() {
        return realMealRepository.findAll();
    }

    public void update(long id, RealMeal realMealUpdate) {
        RealMeal realMeal = getById(id);

        if (realMealUpdate.getDiet() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Diet can not be empty");
        }

        Diet diet = dietService.getById(realMealUpdate.getDiet().getId());

        realMeal.setRegisterDate(realMealUpdate.getRegisterDate());
        realMeal.setRegisterTime(realMealUpdate.getRegisterTime());
        realMeal.setFollowedDiet(realMealUpdate.getFollowedDiet());
        realMeal.setComment(realMealUpdate.getComment());
        realMeal.setDietType(realMealUpdate.getDietType());
        realMeal.setNutritionist(realMealUpdate.getNutritionist());
        realMeal.setPeriod(realMealUpdate.getPeriod());
        realMeal.setDiet(diet);

        realMealRepository.save(realMeal);
    }

    public void deleteById(long id) {
        RealMeal realMeal = getById(id);
        realMealRepository.delete(realMeal);
    }
    
}
