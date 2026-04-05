package com.seuprojeto.frota.service;

import com.seuprojeto.frota.dto.DashboardDTO;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ViagemService viagemService;
    private final ManutencaoService manutencaoService;

    public DashboardService(ViagemService viagemService,
                            ManutencaoService manutencaoService) {
        this.viagemService = viagemService;
        this.manutencaoService = manutencaoService;
    }

    public DashboardDTO obterDashboard() {
        DashboardDTO dto = new DashboardDTO();

        dto.setTotalKm(viagemService.totalQuilometragem());
        dto.setRanking(viagemService.rankingUtilizacao());
        dto.setVolumePorTipo(viagemService.volumePorTipo());
        dto.setProjecaoFinanceira(manutencaoService.projecaoFinanceira());
        dto.setProximasManutencoes(manutencaoService.proximasManutencoes());

        return dto;
    }
}