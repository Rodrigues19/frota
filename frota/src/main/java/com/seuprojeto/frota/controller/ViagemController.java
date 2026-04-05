package com.seuprojeto.frota.controller;

import com.seuprojeto.frota.dto.DashboardDTO;
import com.seuprojeto.frota.dto.RankingVeiculoDTO;
import com.seuprojeto.frota.entity.Manutencao;
import com.seuprojeto.frota.entity.Viagem;
import com.seuprojeto.frota.service.DashboardService;
import com.seuprojeto.frota.service.ManutencaoService;
import com.seuprojeto.frota.service.ViagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.seuprojeto.frota.dto.TipoVeiculoDTO;

import java.util.List;

@RestController
@RequestMapping("/viagens")
@CrossOrigin(origins = "http://localhost:3000")
public class ViagemController {

    @Autowired
    private ViagemService viagemService;
    @Autowired
    private ManutencaoService manutencaoService;
    @Autowired
    private DashboardService dashboardService;

    // 🔹 LISTAR TODAS
    @GetMapping
    public List<Viagem> listar() {
        return viagemService.listarTodas();
    }

    @GetMapping("/total-km")
    public Double totalKm() {
        return viagemService.totalQuilometragem();
    }

    // 🔹 BUSCAR POR ID
    @GetMapping("/{id:\\d+}")
    public Viagem buscar(@PathVariable Integer id) {
        return viagemService.buscarPorId(id);
    }

    // 🔹 CRIAR
    @PostMapping
    public Viagem criar(@RequestBody Viagem viagem) {
        return viagemService.salvar(viagem);
    }

    // 🔹 ATUALIZAR
    @PutMapping("/{id}")
    public Viagem atualizar(@PathVariable Integer id, @RequestBody Viagem viagem) {
        viagem.setId(id);
        return viagemService.salvar(viagem);
    }

    // 🔹 DELETAR
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        viagemService.deletar(id);
    }

    @GetMapping("/volume-por-tipo")
    public List<TipoVeiculoDTO> volumePorTipo() {
        return viagemService.volumePorTipo();
    }

    @GetMapping("/ranking")
    public RankingVeiculoDTO ranking() {
        return viagemService.rankingUtilizacao();
    }

    @GetMapping("/manutencoes/proximas")
    public List<Manutencao> proximasManutencoes() {
        return manutencaoService.proximasManutencoes();
    }

    @GetMapping("/projecao-financeira")
    public Double projecaoFinanceira() {
        return manutencaoService.projecaoFinanceira();
    }

    @GetMapping("/dashboard")
    public DashboardDTO dashboard() {
        return dashboardService.obterDashboard();
    }

}