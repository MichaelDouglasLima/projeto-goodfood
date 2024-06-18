package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.RealMeal;
import com.goodfood.goodfoodbackend.services.RealMealService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/real-meals")
@Tag(name = "RealMeal", description = "the RealMeal API")
@CrossOrigin
public class RealMealController {

    private final RealMealService realMealService;

    @PostMapping
    public ResponseEntity<RealMeal> save(@RequestBody RealMeal realMeal) {
        realMeal = realMealService.save(realMeal);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(realMeal.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RealMeal> getRealMeal(@PathVariable long id) {
        RealMeal realMeal = realMealService.getById(id);
        return ResponseEntity.ok(realMeal);
    }

    @GetMapping
    public ResponseEntity<List<RealMeal>> getRealMeals() {
        return ResponseEntity.ok(realMealService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRealMeal(@PathVariable long id, @RequestBody RealMeal realMealUpdate) {
        realMealService.update(id, realMealUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeRealMeal(@PathVariable long id) {
        realMealService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
