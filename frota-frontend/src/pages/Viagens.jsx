import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/NavBar";

export default function Viagens() {
  const [viagens, setViagens] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novaViagem, setNovaViagem] = useState({
    origem: "",
    destino: "",
    dataSaida: "",
    dataChegada: "",
    veiculoId: "",
    kmPercorrida: ""
  });
  const [viagemEditando, setViagemEditando] = useState(null);

  useEffect(() => {
    api.get("/viagens")
      .then(res => setViagens(res.data))
      .catch(err => console.error(err));
  }, []);

  const formatarData = (data) => {



    return new Date(data).toLocaleString("pt-BR");
  };

  const salvarViagem = () => {
    const payload = {
      origem: novaViagem.origem,
      destino: novaViagem.destino,
      dataSaida: novaViagem.dataSaida + ":00",
      dataChegada: novaViagem.dataChegada + ":00",
      kmPercorrida: Number(novaViagem.kmPercorrida),
      veiculo: {
        id: Number(novaViagem.veiculoId)
      }
    };

    const request = viagemEditando
      ? api.put(`/viagens/${viagemEditando}`, payload)
      : api.post("/viagens", payload);

    request
      .then(() => {
        alert(viagemEditando ? "Atualizado!" : "Criado!");

        return api.get("/viagens");
      })
      .then(res => {
        setViagens(res.data);
        setMostrarForm(false);
        setViagemEditando(null);
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao salvar");
      });
  };

  const editarViagem = (viagem) => {
  setNovaViagem({
    origem: viagem.origem,
    destino: viagem.destino,
    dataSaida: viagem.dataSaida.slice(0, 16),
    dataChegada: viagem.dataChegada.slice(0, 16),
    kmPercorrida: viagem.kmPercorrida || 0,
    veiculoId: viagem.veiculo?.id
  });

  setViagemEditando(viagem.id);
  setMostrarForm(true);
};

  const deletarViagem = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    api.delete(`/viagens/${id}`)
      .then(() => {
        alert("Excluído com sucesso!");

        // atualiza lista
        setViagens(prev => prev.filter(v => v.id !== id));
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao excluir");
      });
  };

  return (
    <div style={{ flex: 1 }}>

      <Navbar />

      {/*  Conteúdo central */}
      <div style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>

        {/*  Cabeçalho */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <h1 style={{ margin: 0 }}>Viagens</h1>

          <button
            onClick={() => setMostrarForm(true)}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            + Nova Viagem
          </button>
        </div>

        {/*  Formulário */}
        {mostrarForm && (
          <div style={{
            marginBottom: "20px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}>
            <h2>{viagemEditando ? "Editar Viagem" : "Nova Viagem"}</h2>

            <input
              placeholder="Origem"
              style={inputStyle}
              value={novaViagem.origem}
              onChange={(e) => setNovaViagem({ ...novaViagem, origem: e.target.value })}
            />

            <input
              placeholder="Destino"
              style={inputStyle}
              value={novaViagem.destino}
              onChange={(e) => setNovaViagem({ ...novaViagem, destino: e.target.value })}
            />

            <input
              type="datetime-local"
              style={inputStyle}
              value={novaViagem.dataSaida}
              onChange={(e) => setNovaViagem({ ...novaViagem, dataSaida: e.target.value })}
            />

            <input
              type="datetime-local"
              style={inputStyle}
              value={novaViagem.dataChegada}
              onChange={(e) => setNovaViagem({ ...novaViagem, dataChegada: e.target.value })}
            />

            <input
              placeholder="ID do Veículo"
              style={inputStyle}
              value={novaViagem.veiculoId}
              onChange={(e) =>
                setNovaViagem({
                  ...novaViagem,
                  veiculoId: e.target.value
                })
              }
            />

            <input
              placeholder="KM Percorrido"
              type="number"
              style={inputStyle}
              value={novaViagem.kmPercorrida}
              onChange={(e) =>
                setNovaViagem({
                  ...novaViagem,
                  kmPercorrida: e.target.value
                })
              }
            />

            <button style={btnSalvar} onClick={salvarViagem}>
              Salvar
            </button>
          </div>
        )}

        {/*  Tabela */}
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}>
            <thead>
              <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Origem</th>
                <th style={thStyle}>Destino</th>
                <th style={thStyle}>Veículo</th>
                <th style={thStyle}>Placa</th>
                <th style={thStyle}>Saída</th>
                <th style={thStyle}>Chegada</th>
                <th style={thStyle}>KM</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {viagens.map((v, index) => (
                <tr
                  key={v.id}
                  style={{
                    background: index % 2 === 0 ? "white" : "#f8fafc"
                  }}
                >
                  <td style={tdStyle}>{v.id}</td>
                  <td style={tdStyle}>{v.origem}</td>
                  <td style={tdStyle}>{v.destino}</td>
                  <td style={tdStyle}>{v.veiculo?.modelo}</td>
                  <td style={tdStyle}>{v.veiculo?.placa}</td>
                  <td style={tdStyle}>{formatarData(v.dataSaida)}</td>
                  <td style={tdStyle}>{formatarData(v.dataChegada)}</td>
                  <td style={tdStyle}>
                    {v.kmPercorrida ?? "-"}
                  </td>
                  <td style={tdStyle}>
                    <button
                      title="Editar"
                      onClick={() => editarViagem(v)}
                      style={btnEditar}
                    >
                      ✏️
                    </button>

                    <button
                      title="Excluir"
                      onClick={() => deletarViagem(v.id)}
                      style={btnExcluir}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/*  Estilos */

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

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1"
};

const btnEditar = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 8px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "5px"
};

const btnExcluir = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 8px",
  borderRadius: "6px",
  cursor: "pointer"
};

const btnSalvar = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
};