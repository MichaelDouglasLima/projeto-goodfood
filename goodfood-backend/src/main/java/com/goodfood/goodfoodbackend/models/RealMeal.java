package com.goodfood.goodfoodbackend.models;

import java.time.LocalDate;
import java.time.LocalTime;

import com.goodfood.goodfoodbackend.models.enums.Period;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "real_meal")
public class RealMeal {

    // Esta classe está diferente do DER mesmo, está ligada com o histórico no frontend

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate registerDate;

    private LocalTime registerTime;

    private Boolean followedDiet;

    private String comment;

    private String dietType;

    private String nutritionist;

    @Enumerated(EnumType.STRING)
    private Period period;

    @ManyToOne(optional = false)
    @JoinColumn(name = "diet_id")
    private Diet diet;
}
