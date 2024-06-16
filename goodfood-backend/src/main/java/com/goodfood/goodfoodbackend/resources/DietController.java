package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.Diet;
import com.goodfood.goodfoodbackend.services.DietService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/diets")
@Tag(name = "Diet", description = "the Diet API")
@CrossOrigin
public class DietController {

    private final DietService dietService;

    @PostMapping
    public ResponseEntity<Diet> save(@RequestBody Diet diet) {
        diet = dietService.save(diet);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(diet.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Diet> getDiet(@PathVariable long id) {
        Diet diet = dietService.getById(id);
        return ResponseEntity.ok(diet);
    }

    @GetMapping
    public ResponseEntity<List<Diet>> getDiets() {
        return ResponseEntity.ok(dietService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateDiet(@PathVariable long id, @RequestBody Diet dietUpdate) {
        dietService.update(id, dietUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeDiet(@PathVariable long id) {
        dietService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
