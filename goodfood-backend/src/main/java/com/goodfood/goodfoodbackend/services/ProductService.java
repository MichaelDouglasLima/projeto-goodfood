package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Product;
import com.goodfood.goodfoodbackend.models.Category;
import com.goodfood.goodfoodbackend.repositories.ProductRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryService categoryService;

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product getById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public void update(long id, Product productUpdate) {
        Product product = getById(id);

        if (productUpdate.getCategory() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category can not be empty");
        }

        Category category = categoryService.getById(productUpdate.getCategory().getId());

        product.setDescription(productUpdate.getDescription());
        product.setCalories(productUpdate.getCalories());
        product.setCategory(category);

        productRepository.save(product);
    }

    public void deleteById(long id) {
        Product product = getById(id);
        productRepository.delete(product);
    }

}
