export default function TabelaManutencoes({ manutencoes }) {

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  // 🔥 NOVO: função de status
  const calcularStatus = (data) => {
    const hoje = new Date();
    const dataManutencao = new Date(data);

    const diffDias = (dataManutencao - hoje) / (1000 * 60 * 60 * 24);

    if (diffDias < 0) return "ATRASADO";
    if (diffDias <= 7) return "PROXIMO";
    return "EM DIA";
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Próximas Manutenções</h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "15px",
        background: "white",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>

        <thead>
          <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
            <th style={thStyle}>Veículo</th>
            <th style={thStyle}>Placa</th>
            <th style={thStyle}>Serviço</th>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Custo</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {manutencoes.map((m, index) => {

            const status = calcularStatus(m.dataInicio);

            const cores = {
              ATRASADO: { bg: "#fee2e2", color: "#b91c1c" },
              PROXIMO: { bg: "#fef9c3", color: "#a16207" },
              "EM DIA": { bg: "#dcfce7", color: "#166534" }
            };

            return (
              <tr
                key={m.id}
                style={{
                  background: index % 2 === 0 ? "white" : "#f8fafc"
                }}
              >
                <td style={tdStyle}>{m.veiculo.modelo}</td>
                <td style={tdStyle}>{m.veiculo.placa}</td>
                <td style={tdStyle}>{m.tipoServico}</td>
                <td style={tdStyle}>{formatarData(m.dataInicio)}</td>
                <td style={tdStyle}>R$ {m.custoEstimado}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    background: cores[status].bg,
                    color: cores[status].color
                  }}>
                    {status}
                  </span>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#475569",
  fontWeight: "600"
};

const tdStyle = {
  padding: "12px",
  borderTop: "1px solid #e2e8f0"
};