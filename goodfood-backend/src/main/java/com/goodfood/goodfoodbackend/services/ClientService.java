package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Client;
import com.goodfood.goodfoodbackend.repositories.ClientRepository;
import com.goodfood.goodfoodbackend.models.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class ClientService {

    private final ClientRepository clientRepository;

    private final UserService userService;

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public Client getById(long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));
    }

    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    public void update(long id, Client clientUpdate) {
        Client client = getById(id);

        if (clientUpdate.getUser() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User can not be empty");
        }

        User user = userService.getById(clientUpdate.getUser().getId());

        client.setHeight(clientUpdate.getHeight());
        client.setWeight(clientUpdate.getWeight());
        client.setUser(user);

        clientRepository.save(client);
    }

    public void deleteById(long id) {
        Client client = getById(id);
        clientRepository.delete(client);
    }
}
