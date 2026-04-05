export default function Navbar() {

  const hoje = new Date().toLocaleDateString("pt-BR");

  return (
    <div style={{
      height: "60px",
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      
      <h2>Dashboard</h2>

      <div>
        <span style={{ marginRight: "20px" }}>📅 {hoje}</span>
        <span>👤 Admin</span>
      </div>

    </div>
  );
}