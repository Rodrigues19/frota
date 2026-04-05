package com.seuprojeto.frota.repository;

import com.seuprojeto.frota.dto.RankingVeiculoDTO;
import com.seuprojeto.frota.dto.TipoVeiculoDTO;
import com.seuprojeto.frota.entity.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViagemRepository extends JpaRepository<Viagem, Integer> {

    @Query(value = "SELECT COALESCE(SUM(km_percorrida), 0) FROM viagens", nativeQuery = true)
    Double totalQuilometragem();

    @Query(value = """
    SELECT v.tipo as tipo, COUNT(*) as total
    FROM viagens vi
    JOIN veiculos v ON vi.veiculo_id = v.id
    GROUP BY v.tipo
""", nativeQuery = true)
    List<TipoVeiculoDTO> volumePorTipo();

    @Query(value = """
SELECT 
    v.id as veiculoId,
    v.modelo as nome,
    v.placa as placa,
    COALESCE(SUM(vi.km_percorrida), 0) as total
FROM veiculos v
LEFT JOIN viagens vi ON v.id = vi.veiculo_id
GROUP BY v.id, v.modelo, v.placa
ORDER BY total DESC
LIMIT 3
""", nativeQuery = true)
    List<RankingVeiculoDTO> rankingUtilizacao();

}
