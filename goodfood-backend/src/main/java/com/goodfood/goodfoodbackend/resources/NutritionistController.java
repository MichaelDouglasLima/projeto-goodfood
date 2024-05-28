package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.Nutritionist;
import com.goodfood.goodfoodbackend.services.NutritionistService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/nutritionists")
@Tag(name = "nutritionist", description = "the Nutritionist API")
@CrossOrigin
public class NutritionistController {

    private final NutritionistService nutritionistService;

    @PostMapping
    public ResponseEntity<Nutritionist> save(@RequestBody Nutritionist nutritionist) {
        nutritionist = nutritionistService.save(nutritionist);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(nutritionist.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nutritionist> getNutritionist(@PathVariable long id) {
        Nutritionist nutritionist = nutritionistService.getById(id);
        return ResponseEntity.ok(nutritionist);
    }

    @GetMapping
    public ResponseEntity<List<Nutritionist>> getNutritionists() {
        return ResponseEntity.ok(nutritionistService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNutritionist(@PathVariable long id, @RequestBody Nutritionist nutritionistUpdate) {
        nutritionistService.update(id, nutritionistUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeNutritionist(@PathVariable long id) {
        nutritionistService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
