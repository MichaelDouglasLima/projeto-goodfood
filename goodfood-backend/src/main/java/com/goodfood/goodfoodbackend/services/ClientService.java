package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.dto.ClientPutDto;
import com.goodfood.goodfoodbackend.dto.UserPutDto;
import com.goodfood.goodfoodbackend.models.Client;
import com.goodfood.goodfoodbackend.models.User;
import com.goodfood.goodfoodbackend.repositories.ClientRepository;

import jakarta.persistence.EntityNotFoundException;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public Client getById(long id) {
        return clientRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));
    }

    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    public void update(long id, ClientPutDto putDto) {
        Client client = getById(id);
        client.setHeight(putDto.getHeight());
        client.setWeight(putDto.getWeight());

        User user = client.getUser();
        UserPutDto userDto = putDto.getUser();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setBirthDate(userDto.getBirthDate());
        user.setGender(userDto.getGender());
        user.setDescription(userDto.getDescription());

        clientRepository.save(client);
    }

    public void deleteById(long id) {
        Client client = getById(id);
        clientRepository.delete(client);
    }

    public Client findByUserId(long id) {
        return clientRepository.findByUserId(id);
    }
}
