package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_PANTRY")
public class Pantry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pantry;

    @OneToOne
    @JoinColumn(name = "CLIENT_ID")
    private Client id_client;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product id_product;

    public Pantry() {

    }

    public Long getId_pantry() {
        return id_pantry;
    }

    public void setId_pantry(Long id_pantry) {
        this.id_pantry = id_pantry;
    }

    public Client getId_client() {
        return id_client;
    }

    public void setId_client(Client id_client) {
        this.id_client = id_client;
    }

    public Product getId_product() {
        return id_product;
    }

    public void setId_product(Product id_product) {
        this.id_product = id_product;
    }
    
}
