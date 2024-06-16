package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.MealProduct;
import com.goodfood.goodfoodbackend.services.MealProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/mealProducts")
@Tag(name = "MealProduct", description = "the MealProduct API")
@CrossOrigin
public class MealProductController {

    private final MealProductService mealProductService;

    @PostMapping
    public ResponseEntity<MealProduct> save(@RequestBody MealProduct mealProduct) {
        mealProduct = mealProductService.save(mealProduct);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(mealProduct.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealProduct> getMealProduct(@PathVariable long id) {
        MealProduct mealProduct = mealProductService.getById(id);
        return ResponseEntity.ok(mealProduct);
    }

    @GetMapping
    public ResponseEntity<List<MealProduct>> getMealProducts() {
        return ResponseEntity.ok(mealProductService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMealProduct(@PathVariable long id, @RequestBody MealProduct mealProductUpdate) {
        mealProductService.update(id, mealProductUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeMealProduct(@PathVariable long id) {
        mealProductService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
