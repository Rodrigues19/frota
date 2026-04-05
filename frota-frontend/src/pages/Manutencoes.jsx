import { useEffect, useState } from "react";
import api from "../services/api";
import TabelaManutencoes from "../components/TabelaManutencoes";
import Navbar from "../components/NavBar";


export default function Manutencoes() {
  const [manutencoes, setManutencoes] = useState([]);

  useEffect(() => {
    api.get("/viagens/manutencoes/proximas")
      .then(res => setManutencoes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Manutenções</h1>

        <TabelaManutencoes manutencoes={manutencoes} />
      </div>
    </div>
  );
}