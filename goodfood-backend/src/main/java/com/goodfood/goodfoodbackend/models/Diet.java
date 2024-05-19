package com.goodfood.goodfoodbackend.models;

import com.goodfood.goodfoodbackend.models.enums.DietStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "diet")
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO: mudar para enum com os possíveis valores
    @Column(nullable = false)
    private String dietType;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private DietStatus status;

    private Integer totalMeals;

    @Column(length = 1024)
    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "nutritionist_client_id")
    private NutritionistClient nutritionistClient;

    @ManyToMany
    @JoinTable(
            name = "diet_meal",
            joinColumns = @JoinColumn(name = "diet_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "meal_id", referencedColumnName = "id"))
    private List<Meal> meals;
}
