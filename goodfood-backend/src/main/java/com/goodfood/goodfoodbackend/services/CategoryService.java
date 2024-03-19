package com.goodfood.goodfoodbackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import com.goodfood.goodfoodbackend.models.Category;
import com.goodfood.goodfoodbackend.repositories.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Category getById(int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        
        return category;
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public void update(@PathVariable int id, @RequestBody Category categoryUpdate) {
        Category category = getById(id);
        category.setName(categoryUpdate.getName());
        categoryRepository.save(category);
    }

    public void deleteById(int id) {
        Category category = getById(id);
        categoryRepository.delete(category);
    }
}
