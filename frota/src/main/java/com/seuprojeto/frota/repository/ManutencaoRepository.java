package com.seuprojeto.frota.repository;

import com.seuprojeto.frota.entity.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManutencaoRepository extends JpaRepository<Manutencao, Integer> {

    List<Manutencao> findTop5ByStatusInOrderByDataInicioAsc(List<String> status);
    @Query(value = """
    SELECT COALESCE(SUM(custo_estimado), 0)
    FROM manutencoes
    WHERE EXTRACT(MONTH FROM data_inicio) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM data_inicio) = EXTRACT(YEAR FROM CURRENT_DATE)
""", nativeQuery = true)
    Double projecaoFinanceira();
}