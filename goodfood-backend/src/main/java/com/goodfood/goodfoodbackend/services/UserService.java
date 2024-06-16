package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public void update(long id, User userUpdate) {
        User user = getById(id);

        user.setName(userUpdate.getName());
        user.setEmail(userUpdate.getEmail());
        user.setPassword(userUpdate.getPassword());
        user.setDescription(userUpdate.getDescription());

        //TODO Adicionar estes atributos no update de user causara algum erro?
        // user.setUsername(userUpdate.getUsername());
        // user.setRole(userUpdate.getRole());
        // user.setPhoneNumber(userUpdate.getPhoneNumber());
        // user.setBirthDate(userUpdate.getBirthDate());
        // user.setGender(userUpdate.getGender());

        userRepository.save(user);
    }

    public void deleteById(long id) {
        User user = getById(id);
        userRepository.delete(user);
    }

}
