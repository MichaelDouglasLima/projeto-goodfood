package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.Food;
import com.goodfood.goodfoodbackend.services.FoodService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/foods")
@Tag(name = "Food", description = "the Food API")
@CrossOrigin
public class FoodController {

    private final FoodService foodService;

    @PostMapping
    public ResponseEntity<Food> save(@RequestBody Food food) {
        food = foodService.save(food);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(food.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFood(@PathVariable long id) {
        Food food = foodService.getById(id);
        return ResponseEntity.ok(food);
    }

    @GetMapping
    public ResponseEntity<List<Food>> getFoods() {
        return ResponseEntity.ok(foodService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateFood(@PathVariable long id, @RequestBody Food foodUpdate) {
        foodService.update(id, foodUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFood(@PathVariable long id) {
        foodService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
}
