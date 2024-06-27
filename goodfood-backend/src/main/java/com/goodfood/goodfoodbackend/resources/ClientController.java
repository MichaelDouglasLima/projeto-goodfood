package com.goodfood.goodfoodbackend.resources;

import com.goodfood.goodfoodbackend.dto.ClientPutDto;
import com.goodfood.goodfoodbackend.models.Client;
import com.goodfood.goodfoodbackend.services.ClientService;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/clients")
@Tag(name = "Client", description = "the Client API")
@CrossOrigin
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<Client> save(@RequestBody Client client) {
        client = clientService.save(client);

        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(client.getId())
                        .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable long id) {
        Client client = clientService.getById(id);
        return ResponseEntity.ok(client);
    }

    @GetMapping
    public ResponseEntity<List<Client>> getClients() {
        return ResponseEntity.ok(clientService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateClient(
            @PathVariable long id, @Valid @RequestBody ClientPutDto putDto) {
        clientService.update(id, putDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeClient(@PathVariable long id) {
        clientService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Client> getByUserId(@PathVariable long id) {
        return ResponseEntity.ok(clientService.findByUserId(id));
    }
}
