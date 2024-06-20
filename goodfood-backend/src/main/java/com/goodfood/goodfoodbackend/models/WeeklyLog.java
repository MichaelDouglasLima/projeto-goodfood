package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "weekly_log")
public class WeeklyLog {

    // Esta classe é referente a tela experiência semanal no FrontEnd

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double rating;

    private Double weight;

    private LocalDate endDate;

    @Column(length = 1024)
    private String description;

    @ManyToOne(optional = true)
    @JoinColumn(name = "diet_id")
    private Diet diet;

    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
}