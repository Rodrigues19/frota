package com.seuprojeto.frota.service;

import com.seuprojeto.frota.dto.RankingVeiculoDTO;
import com.seuprojeto.frota.entity.Viagem;
import com.seuprojeto.frota.repository.ViagemRepository;
import org.springframework.stereotype.Service;

import com.seuprojeto.frota.dto.TipoVeiculoDTO;

import java.util.List;

@Service
public class ViagemService {

    private final ViagemRepository viagemRepository;

    public ViagemService(ViagemRepository viagemRepository) {
        this.viagemRepository = viagemRepository;
    }

    // LISTAR TODAS
    public List<Viagem> listarTodas() {
        return viagemRepository.findAll();
    }

    // BUSCAR POR ID
    public Viagem buscarPorId(Integer id) {
        return viagemRepository.findById(id).orElse(null);
    }

    // SALVAR (criar ou atualizar)
    public Viagem salvar(Viagem viagem) {
        return viagemRepository.save(viagem);
    }

    // DELETAR
    public void deletar(Integer id) {
        viagemRepository.deleteById(id);
    }

    public Double totalQuilometragem() {
        return viagemRepository.totalQuilometragem();
    }

    public List<TipoVeiculoDTO> volumePorTipo() {
        return viagemRepository.volumePorTipo();
    }

    public RankingVeiculoDTO rankingUtilizacao() {
        List<RankingVeiculoDTO> lista = viagemRepository.rankingUtilizacao();

        return lista.isEmpty() ? null : lista.get(0);
    }

}