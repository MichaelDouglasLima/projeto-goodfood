package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Request;
import com.goodfood.goodfoodbackend.repositories.RequestRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RequestService {

    private final RequestRepository requestRepository;

    public Request save(Request request) {
        return requestRepository.save(request);
    }

    public Request getById(long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Request not found"));
    }

    public List<Request> getAll() {
        return requestRepository.findAll();
    }

    public void update(long id, Request requestUpdate) {
        Request request = getById(id);

        request.setClient(requestUpdate.getClient());
        request.setNutritionist(requestUpdate.getNutritionist());

        requestRepository.save(request);
    }

    public void deleteById(long id) {
        Request request = getById(id);
        requestRepository.delete(request);
    }
}
