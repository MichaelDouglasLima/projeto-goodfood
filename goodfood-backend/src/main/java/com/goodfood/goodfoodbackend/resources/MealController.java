package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.Meal;
import com.goodfood.goodfoodbackend.services.MealService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/meals")
@Tag(name = "Meal", description = "the Meal API")
@CrossOrigin
public class MealController {

    private final MealService mealService;

    @PostMapping
    public ResponseEntity<Meal> save(@RequestBody Meal meal) {
        meal = mealService.save(meal);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(meal.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMeal(@PathVariable long id) {
        Meal meal = mealService.getById(id);
        return ResponseEntity.ok(meal);
    }

    @GetMapping
    public ResponseEntity<List<Meal>> getMeals() {
        return ResponseEntity.ok(mealService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMeal(@PathVariable long id, @RequestBody Meal mealUpdate) {
        mealService.update(id, mealUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeMeal(@PathVariable long id) {
        mealService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
