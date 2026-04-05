import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";

export default function GraficoTipos({ dados }) {

  const tiposFixos = ["LEVE", "PESADO"];

  const dadosFormatados = tiposFixos.map(tipo => {
    const encontrado = dados.find(d => d.tipo === tipo);
    return {
      tipo,
      total: encontrado ? encontrado.total : 0
    };
  });

  return (
    <div style={{
      marginTop: "40px",
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ marginBottom: "20px" }}>
        Volume por Tipo de Veículo
      </h2>

      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer>
          <BarChart data={dadosFormatados}
          barCategoryGap="30%"
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="tipo"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none"
              }}
            />

            <Bar
              dataKey="total"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              barSize={40}
            >
              <LabelList
                dataKey="total"
                position="top"
              />
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}