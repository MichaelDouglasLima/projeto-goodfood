package com.goodfood.goodfoodbackend.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_NUTRITIONIST")
public class Nutritionist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_nutritionist;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = true, length = 1024)
    private String description;

    @Column(nullable = true, length = 1024)
    private String cellphone;

    @Column(nullable = true)
    private LocalDate dateBirth;

    @Column(nullable = true)
    private String cfm;

    public Nutritionist() {
        
    }

    public Long getId_nutritionist() {
        return id_nutritionist;
    }

    public void setId_nutritionist(Long id_nutritionist) {
        this.id_nutritionist = id_nutritionist;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public LocalDate getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(LocalDate dateBirth) {
        this.dateBirth = dateBirth;
    }

    public String getCfm() {
        return cfm;
    }

    public void setCfm(String cfm) {
        this.cfm = cfm;
    }

}
