package com.goodfood.goodfoodbackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TBL_NUTRITIONIST_CLIENT")
public class Nutritionist_Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "ID_NUTRITIONIST")
    private Nutritionist id_nutritionist;

    @OneToOne
    @JoinColumn(name = "ID_CLIENT")
    private Client id_client;

    public Nutritionist_Client() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Nutritionist getId_nutritionist() {
        return id_nutritionist;
    }

    public void setId_nutritionist(Nutritionist id_nutritionist) {
        this.id_nutritionist = id_nutritionist;
    }

    public Client getId_client() {
        return id_client;
    }

    public void setId_client(Client id_client) {
        this.id_client = id_client;
    }

}
