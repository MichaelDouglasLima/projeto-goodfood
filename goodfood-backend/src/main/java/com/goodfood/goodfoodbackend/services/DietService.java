package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Diet;
import com.goodfood.goodfoodbackend.repositories.DietRepository;
import com.goodfood.goodfoodbackend.models.NutritionistClient;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class DietService {

    private final DietRepository dietRepository;

    private final NutritionistClientService nutritionistClientService;

    public Diet save(Diet diet) {
        return dietRepository.save(diet);
    }

    public Diet getById(long id) {
        return dietRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Diet not found"));
    }

    public List<Diet> getAll() {
        return dietRepository.findAll();
    }

    public void update(long id, Diet dietUpdate) {
        Diet diet = getById(id);

        // if (dietUpdate.getNutritionistClient() == null) {
        //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NutritionistClient can not be empty");
        // }

        // NutritionistClient nutritionistClient = nutritionistClientService.getById(dietUpdate.getNutritionistClient().getId());


        // if (dietUpdate.getNutritionistClient().getNutritionist() == null) {
        //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nutritionist can not be empty");
        // }

        // if (dietUpdate.getNutritionistClient().getClient() == null) {
        //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Client can not be empty");
        // }

        // Nutritionist nutritionist = nutritionistService.getById(dietUpdate.getNutritionistClient().getNutritionist().getId());

        // Client client = clientService.getById(dietUpdate.getNutritionistClient().getClient().getId());

        diet.setDietType(dietUpdate.getDietType());
        diet.setStartDate(dietUpdate.getStartDate());
        diet.setEndDate(dietUpdate.getEndDate());
        diet.setStatus(dietUpdate.getStatus());
        diet.setTotalMeals(dietUpdate.getTotalMeals());
        diet.setObservation(dietUpdate.getObservation());
        diet.setClient(dietUpdate.getClient());
        diet.setNutritionist(dietUpdate.getNutritionist());
        // diet.setNutritionistClient(nutritionistClient);

        dietRepository.save(diet);
    }

    public void deleteById(long id) {
        Diet diet = getById(id);
        dietRepository.delete(diet);
    }
}
