package com.goodfood.goodfoodbackend.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_DIET")
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String diet_type;

    @Column(nullable = false)
    private LocalDate dateStart;

    @Column(nullable = true)
    private LocalDate dateEnd;

    private boolean situation; // True = Andamento, Falso = Terminada/Interrompida

    private int totalMeals;

    @Column(nullable = true, length = 1024)
    private String observation;

    @OneToOne
    @JoinColumn(name = "ID_NUTRITIONIST_CLIENT")
    private Nutritionist_Client id_nutritionist_client;

    public Diet() {
        
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiet_type() {
        return diet_type;
    }

    public void setDiet_type(String diet_type) {
        this.diet_type = diet_type;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }

    public boolean isSituation() {
        return situation;
    }

    public void setSituation(boolean situation) {
        this.situation = situation;
    }

    public int getTotalMeals() {
        return totalMeals;
    }

    public void setTotalMeals(int totalMeals) {
        this.totalMeals = totalMeals;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Nutritionist_Client getId_nutritionist_client() {
        return id_nutritionist_client;
    }

    public void setId_nutritionist_client(Nutritionist_Client id_nutritionist_client) {
        this.id_nutritionist_client = id_nutritionist_client;
    }

}
