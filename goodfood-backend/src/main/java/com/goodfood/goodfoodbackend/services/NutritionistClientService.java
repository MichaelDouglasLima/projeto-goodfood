package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.NutritionistClient;
import com.goodfood.goodfoodbackend.repositories.NutritionistClientRepository;
import com.goodfood.goodfoodbackend.models.Client;
import com.goodfood.goodfoodbackend.models.Nutritionist;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class NutritionistClientService {

    private final NutritionistClientRepository nutritionistClientRepository;

    private final NutritionistService nutritionistService;

    private final ClientService clientService;


    public NutritionistClient save(NutritionistClient nutritionistClient) {
        return nutritionistClientRepository.save(nutritionistClient);
    }

    public NutritionistClient getById(long id) {
        return nutritionistClientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NutritionistClient not found"));
    }

    public List<NutritionistClient> getAll() {
        return nutritionistClientRepository.findAll();
    }

    public void update(long id, NutritionistClient nutritionistClientUpdate) {
        NutritionistClient nutritionistClient = getById(id);

        if (nutritionistClientUpdate.getNutritionist()== null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nutritionist can not be empty");
        }

        if (nutritionistClientUpdate.getClient()== null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Client can not be empty");
        }

        Nutritionist nutritionist = nutritionistService.getById(nutritionistClientUpdate.getNutritionist().getId());

        Client client = clientService.getById(nutritionistClientUpdate.getClient().getId());

        nutritionistClient.setClient(client);
        nutritionistClient.setNutritionist(nutritionist);

        nutritionistClientRepository.save(nutritionistClient);
    }

    public void deleteById(long id) {
        NutritionistClient nutritionistClient = getById(id);
        nutritionistClientRepository.delete(nutritionistClient);
    }
}
