package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.models.Request;
import com.goodfood.goodfoodbackend.services.RequestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/requests")
@Tag(name = "Request", description = "the Request API")
@CrossOrigin
public class RequestController {

    private final RequestService requestService;

    @PostMapping
    public ResponseEntity<Request> save(@RequestBody Request request) {
        request = requestService.save(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(request.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequest(@PathVariable long id) {
        Request request = requestService.getById(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping
    public ResponseEntity<List<Request>> getRequests() {
        return ResponseEntity.ok(requestService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRequest(@PathVariable long id, @RequestBody Request requestUpdate) {
        requestService.update(id, requestUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeRequest(@PathVariable long id) {
        requestService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
