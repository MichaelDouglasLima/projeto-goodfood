package com.goodfood.goodfoodbackend.dto;

import lombok.Data;

@Data
public class ClientPutDto {

    private Double height;
    private Double weight;

    private UserPutDto user;
}
