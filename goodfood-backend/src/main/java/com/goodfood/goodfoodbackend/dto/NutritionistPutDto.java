package com.goodfood.goodfoodbackend.dto;

import lombok.Data;

@Data
public class NutritionistPutDto {

    private String cfn;

    private UserPutDto user;
}
