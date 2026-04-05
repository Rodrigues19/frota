export default function CardResumo({ titulo, valor, subvalor, isMoney, destaque }) {

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(valor);
  };

  return (
    <div style={{
      background: destaque ? "#f0f7ff" : "white",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      boxShadow: destaque
        ? "0 6px 16px rgba(59,130,246,0.25)"
        : "0 4px 10px rgba(0,0,0,0.08)",
      border: destaque
        ? "1px solid #3b82f6"
        : "1px solid #e5e7eb",
      transition: "0.2s"
    }}>
      <h3 style={{
        color: destaque ? "#2563eb" : "#64748b",
        fontSize: "14px"
      }}>
        {titulo}
      </h3>

      <p style={{
        fontSize: "22px",
        fontWeight: "bold",
        marginTop: "10px",
        color: destaque ? "#1e3a8a" : "#111"
      }}>
        {isMoney ? formatarMoeda(valor) : valor}
      </p>
      {subvalor && (
        <p style={{ color: destaque ? "#1e3a8a" : "#111" }}>

          {subvalor}
        </p>)}

    </div>
  );
}