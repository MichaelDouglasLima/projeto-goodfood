package com.goodfood.goodfoodbackend.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.goodfood.goodfoodbackend.models.Nutritionist;
import com.goodfood.goodfoodbackend.services.NutritionistService;

@RestController
@CrossOrigin
public class NutritionistController {

    @Autowired
    private NutritionistService nutritionistService;

    @PostMapping("nutritionists")
    public ResponseEntity<Nutritionist> save(@RequestBody Nutritionist nutritionist) {
        
        nutritionist = nutritionistService.save(nutritionist);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(nutritionist.getId_nutritionist())
                .toUri();

        return ResponseEntity.created(location).body(nutritionist);
    }

    @GetMapping("nutritionists/{id}")
    public ResponseEntity<Nutritionist> getNutritionist(@PathVariable int id) {
        Nutritionist nutritionist = nutritionistService.getById(id);
        return ResponseEntity.ok(nutritionist);
    }
    
    @GetMapping("nutritionists")
    public ResponseEntity<List<Nutritionist>> getNutritionists() {
        return ResponseEntity.ok(nutritionistService.getAll());
    }

    @PutMapping("nutritionists/{id}")
    public ResponseEntity<Void> updateNutritionist(@PathVariable int id, @RequestBody Nutritionist nutritionistUpdate) {
        nutritionistService.update(id, nutritionistUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("nutritionists/{id}")
    public ResponseEntity<Void> removeNutritionist(@PathVariable int id) {
        nutritionistService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
