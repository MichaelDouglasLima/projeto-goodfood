package com.goodfood.goodfoodbackend.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.services.UserService;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = userService.getById(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getAll());
    }
}
