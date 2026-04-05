package com.seuprojeto.frota.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "veiculos")

public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    //ATRIBUTOS
    private Integer id;
    private String placa;
    private String modelo;
    private String tipo;
    private Integer ano;

    //CONSTRUTORES
    public Veiculo(){

    }

    //GETTERS E SETTERS

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }


}
