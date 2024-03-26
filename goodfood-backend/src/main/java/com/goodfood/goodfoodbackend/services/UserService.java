package com.goodfood.goodfoodbackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import com.goodfood.goodfoodbackend.models.Category;
import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryService categoryService;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        return user;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public void update(@PathVariable int id, @RequestBody User userUpdate) {
        User user = getById(id);

        if (userUpdate.getCategory() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category can not be empty");
        }
        
        Category category = categoryService.getById(userUpdate.getCategory().getId());

        user.setName(userUpdate.getName());
        user.setEmail(userUpdate.getEmail());
        user.setPassword(userUpdate.getPassword());
        user.setDescription(userUpdate.getDescription());
        user.setCategory(category);

        userRepository.save(user);
    }
    
    public void deleteById(int id) {
        User user = getById(id);
        userRepository.delete(user);
    }

}
