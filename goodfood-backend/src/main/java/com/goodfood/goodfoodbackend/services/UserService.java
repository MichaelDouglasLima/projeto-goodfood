package com.goodfood.goodfoodbackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        return user;
    }

    public List <User> getAll() {
        return userRepository.findAll();
    }
    
}
