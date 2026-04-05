import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const getItemStyle = (path) => ({
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "10px",
        background: location.pathname === path ? "#334155" : "transparent"
    });

    return (
        <div style={{
            width: "220px",
            minheight: "100vh",
            background: "#1e293b",
            color: "white",
            padding: "20px"
        }}>
            <h2 style={{ marginBottom: "30px" }}>🚗 Frota</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>

                <li
                    style={getItemStyle("/")}
                    onClick={() => navigate("/")}
                >
                    📊 Dashboard
                </li>

                <li
                    style={getItemStyle("/viagens")}
                    onClick={() => navigate("/viagens")}
                >
                    🛣️ Viagens
                </li>

                <li
                    style={getItemStyle("/manutencoes")}
                    onClick={() => navigate("/manutencoes")}
                >
                    🔧 Manutenções
                </li>

            </ul>
        </div>
    );
}
