package com.seuprojeto.frota.dto;

import com.seuprojeto.frota.entity.Manutencao;
import java.util.List;

public class DashboardDTO {

    private Double totalKm;
    private RankingVeiculoDTO ranking;
    private List<TipoVeiculoDTO> volumePorTipo;
    private Double projecaoFinanceira;
    private List<Manutencao> proximasManutencoes;

    // getters e setters

    public Double getTotalKm() {
        return totalKm;
    }

    public void setTotalKm(Double totalKm) {
        this.totalKm = totalKm;
    }

    public RankingVeiculoDTO getRanking() {
        return ranking;
    }

    public void setRanking(RankingVeiculoDTO ranking) {
        this.ranking = ranking;
    }

    public List<TipoVeiculoDTO> getVolumePorTipo() {
        return volumePorTipo;
    }

    public void setVolumePorTipo(List<TipoVeiculoDTO> volumePorTipo) {
        this.volumePorTipo = volumePorTipo;
    }

    public Double getProjecaoFinanceira() {
        return projecaoFinanceira;
    }

    public void setProjecaoFinanceira(Double projecaoFinanceira) {
        this.projecaoFinanceira = projecaoFinanceira;
    }

    public List<Manutencao> getProximasManutencoes() {
        return proximasManutencoes;
    }

    public void setProximasManutencoes(List<Manutencao> proximasManutencoes) {
        this.proximasManutencoes = proximasManutencoes;
    }
}