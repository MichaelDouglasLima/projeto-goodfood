package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double height;
    private Double weight;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    //TODO Esse atributo seria a Entidade LISTA_PRODUTOS_DESPENSA?
    //TODO Esse atributo impede de fazer um GET no endpoint de clients por algum motivo
    @ManyToMany
    @JoinTable(
            name = "client_product",
            joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private List<Product> products;
    

    // Testando como recuperar alimentos
    // @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Food> foods;
}
