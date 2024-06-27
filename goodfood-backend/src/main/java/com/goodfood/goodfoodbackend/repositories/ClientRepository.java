package com.goodfood.goodfoodbackend.repositories;

import com.goodfood.goodfoodbackend.models.Client;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

    public Client findByUserId(long id);
}
