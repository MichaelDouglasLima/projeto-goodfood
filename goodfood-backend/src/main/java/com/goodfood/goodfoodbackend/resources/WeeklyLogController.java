package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.WeeklyLog;
import com.goodfood.goodfoodbackend.services.WeeklyLogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/weeklyLogs")
@Tag(name = "WeeklyLog", description = "the WeeklyLog API")
@CrossOrigin
public class WeeklyLogController {

    private final WeeklyLogService weeklyLogService;

    @PostMapping
    public ResponseEntity<WeeklyLog> save(@RequestBody WeeklyLog weeklyLog) {
        weeklyLog = weeklyLogService.save(weeklyLog);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(weeklyLog.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeeklyLog> getWeeklyLog(@PathVariable long id) {
        WeeklyLog weeklyLog = weeklyLogService.getById(id);
        return ResponseEntity.ok(weeklyLog);
    }

    @GetMapping
    public ResponseEntity<List<WeeklyLog>> getWeeklyLogs() {
        return ResponseEntity.ok(weeklyLogService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateWeeklyLog(@PathVariable long id, @RequestBody WeeklyLog weeklyLogUpdate) {
        weeklyLogService.update(id, weeklyLogUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeWeeklyLog(@PathVariable long id) {
        weeklyLogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
