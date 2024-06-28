package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.dto.UserPutDto;
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
        return userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public void updateById(long id, UserPutDto putDto) {
        User user = getById(id);
        updateUser(putDto, user);
        userRepository.save(user);
    }

    public void updateUser(UserPutDto putDto, User user) {
        user.setName(putDto.getName());
        user.setEmail(putDto.getEmail());
        user.setDescription(putDto.getDescription());
        user.setPhoneNumber(putDto.getPhoneNumber());
        user.setBirthDate(putDto.getBirthDate());
        user.setGender(putDto.getGender());
    }

    public void deleteById(long id) {
        User user = getById(id);
        userRepository.delete(user);
    }
}
