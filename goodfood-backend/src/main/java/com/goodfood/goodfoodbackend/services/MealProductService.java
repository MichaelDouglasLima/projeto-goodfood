package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Meal;
import com.goodfood.goodfoodbackend.models.MealProduct;
import com.goodfood.goodfoodbackend.models.Product;
import com.goodfood.goodfoodbackend.repositories.MealProductRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class MealProductService {

    private final MealProductRepository mealProductRepository;

    private final MealService mealService;

    private final ProductService productService;

    public MealProduct save(MealProduct mealProduct) {
        return mealProductRepository.save(mealProduct);
    }

    public MealProduct getById(long id) {
        return mealProductRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MealProduct not found"));
    }

    public List<MealProduct> getAll() {
        return mealProductRepository.findAll();
    }

    public void update(long id, MealProduct mealProductUpdate) {
        MealProduct mealProduct = getById(id);

        if (mealProductUpdate.getMeal() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Meal can not be empty");
        }

        if (mealProductUpdate.getProduct() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product can not be empty");
        }

        Meal meal = mealService.getById(mealProductUpdate.getMeal().getId());

        Product product = productService.getById(mealProductUpdate.getProduct().getId());

        mealProduct.setQuantity(mealProductUpdate.getQuantity());
        mealProduct.setUnit(mealProductUpdate.getUnit());
        mealProduct.setMeal(meal);
        mealProduct.setProduct(product);

        mealProductRepository.save(mealProduct);
    }

    public void deleteById(long id) {
        MealProduct mealProduct = getById(id);
        mealProductRepository.delete(mealProduct);
    }
    
}
