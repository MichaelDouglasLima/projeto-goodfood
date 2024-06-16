package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Nutritionist;
import com.goodfood.goodfoodbackend.repositories.NutritionistRepository;
import com.goodfood.goodfoodbackend.models.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class NutritionistService {

    private final NutritionistRepository nutritionistRepository;

    private final UserService userService;

    public Nutritionist save(Nutritionist nutritionist) {
        return nutritionistRepository.save(nutritionist);
    }

    public Nutritionist getById(long id) {
        return nutritionistRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nutritionist not found"));
    }

    public List<Nutritionist> getAll() {
        return nutritionistRepository.findAll();
    }

    // public void update(long id, Nutritionist nutritionistUpdate) {
    //     Nutritionist nutritionist = getById(id);
    //     nutritionist.setUser(nutritionistUpdate.getUser());
    //     nutritionist.setCfn(nutritionistUpdate.getCfn());
    //     nutritionistRepository.save(nutritionist);
    // }

    public void update(long id, Nutritionist nutritionistUpdate) {
        Nutritionist nutritionist = getById(id);

        if (nutritionistUpdate.getUser() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User can not be empty");
        }

        User user = userService.getById(nutritionistUpdate.getUser().getId());

        nutritionist.setCfn(nutritionistUpdate.getCfn());
        nutritionist.setUser(user);

        nutritionistRepository.save(nutritionist);
    }

    public void deleteById(long id) {
        Nutritionist nutritionist = getById(id);
        nutritionistRepository.delete(nutritionist);
    }

}
