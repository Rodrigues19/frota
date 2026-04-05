package com.seuprojeto.frota.service;

import com.seuprojeto.frota.entity.Manutencao;
import com.seuprojeto.frota.repository.ManutencaoRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ManutencaoService {

    private final ManutencaoRepository manutencaoRepository;

    public ManutencaoService(ManutencaoRepository manutencaoRepository) {
        this.manutencaoRepository = manutencaoRepository;
    }


    public List<Manutencao> proximasManutencoes() {
        return manutencaoRepository.findTop5ByStatusInOrderByDataInicioAsc(
                Arrays.asList("PENDENTE", "EM_REALIZACAO")
        );
    }

    public Double projecaoFinanceira() {
        return manutencaoRepository.projecaoFinanceira();
    }

}
