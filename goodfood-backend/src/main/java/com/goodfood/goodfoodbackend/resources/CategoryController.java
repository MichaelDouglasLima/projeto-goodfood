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

import com.goodfood.goodfoodbackend.models.Category;
import com.goodfood.goodfoodbackend.services.CategoryService;

@RestController
@CrossOrigin
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @PostMapping("categories")
    public ResponseEntity<Category> save(@RequestBody Category category) {
        
        category = categoryService.save(category);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(category.getId())
                .toUri();

        return ResponseEntity.created(location).body(category);
    }

    @GetMapping("categories/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable int id) {
        Category category = categoryService.getById(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping("categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @PutMapping("categories/{id}")
    public ResponseEntity<Void> updateCategory(@PathVariable int id, @RequestBody Category categoryUpdate) {
        categoryService.update(id, categoryUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("categories/{id}")
    public ResponseEntity<Void> removeCategory(@PathVariable int id) {
        categoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
