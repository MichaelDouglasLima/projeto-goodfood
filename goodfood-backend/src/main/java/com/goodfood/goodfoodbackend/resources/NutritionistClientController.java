package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.NutritionistClient;
import com.goodfood.goodfoodbackend.services.NutritionistClientService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/nutritionistNutritionistClients")
@Tag(name = "NutritionistClient", description = "the NutritionistClient API")
@CrossOrigin
public class NutritionistClientController {

    private final NutritionistClientService nutritionistNutritionistClientService;

    @PostMapping
    public ResponseEntity<NutritionistClient> save(@RequestBody NutritionistClient nutritionistNutritionistClient) {
        nutritionistNutritionistClient = nutritionistNutritionistClientService.save(nutritionistNutritionistClient);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(nutritionistNutritionistClient.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NutritionistClient> getNutritionistClient(@PathVariable long id) {
        NutritionistClient nutritionistNutritionistClient = nutritionistNutritionistClientService.getById(id);
        return ResponseEntity.ok(nutritionistNutritionistClient);
    }

    @GetMapping
    public ResponseEntity<List<NutritionistClient>> getNutritionistClients() {
        return ResponseEntity.ok(nutritionistNutritionistClientService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNutritionistClient(@PathVariable long id, @RequestBody NutritionistClient nutritionistNutritionistClientUpdate) {
        nutritionistNutritionistClientService.update(id, nutritionistNutritionistClientUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeNutritionistClient(@PathVariable long id) {
        nutritionistNutritionistClientService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
