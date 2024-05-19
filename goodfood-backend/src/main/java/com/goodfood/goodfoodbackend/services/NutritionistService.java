package com.goodfood.goodfoodbackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import com.goodfood.goodfoodbackend.models.Nutritionist;
import com.goodfood.goodfoodbackend.repositories.NutritionistRepository;

@Service
public class NutritionistService {

    @Autowired
    private NutritionistRepository nutritionistRepository;

    public Nutritionist save(Nutritionist nutritionist) {
        return nutritionistRepository.save(nutritionist);
    }

    public Nutritionist getById(int id) {
        Nutritionist nutritionist = nutritionistRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nutritionist not found"));
        
        return nutritionist;
    }

    public List<Nutritionist> getAll() {
        return nutritionistRepository.findAll();
    }

    public void update(@PathVariable int id, @RequestBody Nutritionist nutritionistUpdate) {
        Nutritionist nutritionist = getById(id);
        nutritionist.setUser(nutritionistUpdate.getUser());
        nutritionist.setCfn(nutritionistUpdate.getCfn());
        nutritionistRepository.save(nutritionist);
    }
    
    public void deleteById(int id) {
        Nutritionist nutritionist = getById(id);
        nutritionistRepository.delete(nutritionist);
    }

}
