package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Category;
import com.goodfood.goodfoodbackend.repositories.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Category getById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public void update(long id, Category categoryUpdate) {
        Category category = getById(id);
        category.setDescription(categoryUpdate.getDescription());
        categoryRepository.save(category);
    }

    public void deleteById(long id) {
        Category category = getById(id);
        categoryRepository.delete(category);
    }

}
