import { useEffect, useState } from "react";
import api from "../services/api";
import CardResumo from "../components/CardResumo";
import GraficoTipos from "../components/GraficoTipos";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/viagens/dashboard")
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const contarAtrasadas = (manutencoes) => {
    const hoje = new Date();

    return manutencoes.filter(m => {
      const data = new Date(m.dataInicio);
      return data < hoje;
    }).length;
  };


  if (!data) return <p>Carregando...</p>;
  console.log(data);
  return (
    <div style={{ flex: 1 }}>

      <Navbar />
      <div style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
            Painel de Viagens
          </h1>

          {data.proximasManutencoes && contarAtrasadas(data.proximasManutencoes) > 0 && (
            <div
              onClick={() => navigate("/manutencoes?status=ATRASADO")}
              style={{
                marginTop: "20px",
                padding: "12px 16px",
                background: "#fee2e2",
                color: "#b91c1c",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              🔴 {contarAtrasadas(data.proximasManutencoes)} manutenções atrasadas
            </div>
          )}

        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        <CardResumo titulo="Projeção Financeira" valor={data.projecaoFinanceira} isMoney />
        <CardResumo titulo="Total KM" valor={data.totalKm} />
        <CardResumo titulo="Veículo Top"
          valor={data.ranking?.nome || "N/A"}
          subvalor={
            data.ranking
              ? `${data.ranking.placa} • ${data.ranking.total} km`
              : ""
          } destaque

        />
      </div>

      <div style={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          width: "100%", maxWidth: "900px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <GraficoTipos dados={data.volumePorTipo} />
        </div>
      </div>


    </div>
  );
}