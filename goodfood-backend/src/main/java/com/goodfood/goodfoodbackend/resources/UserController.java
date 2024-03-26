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

import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.services.UserService;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("users")
    public ResponseEntity<User> save(@RequestBody User user) {
        
        user = userService.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getId())
                .toUri();

        return ResponseEntity.created(location).body(user);
    }

    @GetMapping("users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = userService.getById(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @PutMapping("users/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable int id, @RequestBody User userUpdate) {
        userService.update(id, userUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<Void> removeUser(@PathVariable int id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
