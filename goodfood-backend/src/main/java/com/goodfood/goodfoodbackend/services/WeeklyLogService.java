package com.goodfood.goodfoodbackend.services;

import com.goodfood.goodfoodbackend.models.Diet;
import com.goodfood.goodfoodbackend.models.WeeklyLog;
import com.goodfood.goodfoodbackend.repositories.WeeklyLogRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class WeeklyLogService {

    private final WeeklyLogRepository weeklyLogRepository;

    private final DietService dietService;

    public WeeklyLog save(WeeklyLog weeklyLog) {
        return weeklyLogRepository.save(weeklyLog);
    }

    public WeeklyLog getById(long id) {
        return weeklyLogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("WeeklyLog not found"));
    }

    public List<WeeklyLog> getAll() {
        return weeklyLogRepository.findAll();
    }

    public void update(long id, WeeklyLog weeklyLogUpdate) {
        WeeklyLog weeklyLog = getById(id);

        if (weeklyLogUpdate.getDiet() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Diet can not be empty");
        }

        Diet diet = dietService.getById(weeklyLogUpdate.getDiet().getId());

        weeklyLog.setRating(weeklyLogUpdate.getRating());
        weeklyLog.setWeight(weeklyLogUpdate.getWeight());
        weeklyLog.setEndDate(weeklyLogUpdate.getEndDate());
        weeklyLog.setDescription(weeklyLogUpdate.getDescription());
        weeklyLog.setDiet(diet);

        weeklyLogRepository.save(weeklyLog);
    }

    public void deleteById(long id) {
        WeeklyLog weeklyLog = getById(id);
        weeklyLogRepository.delete(weeklyLog);
    }
}
