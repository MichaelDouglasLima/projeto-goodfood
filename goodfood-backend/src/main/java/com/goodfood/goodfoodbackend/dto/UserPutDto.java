package com.goodfood.goodfoodbackend.dto;

import com.goodfood.goodfoodbackend.models.enums.Gender;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserPutDto {

    private String name;
    private String email;
    private String phoneNumber;
    private LocalDate birthDate;
    private Gender gender;
    private String description;
}
