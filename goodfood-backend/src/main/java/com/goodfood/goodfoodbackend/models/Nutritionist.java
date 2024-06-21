package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "nutritionist")
public class Nutritionist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cfn;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    //TODO como fazer para recuperar os clientes deste nutricionista?
}
