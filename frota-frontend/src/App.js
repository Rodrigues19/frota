import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Viagens from "./pages/Viagens";
import Manutencoes from "./pages/Manutencoes";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>

        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/viagens" element={<Viagens />} />
          <Route path="/manutencoes" element={<Manutencoes />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;