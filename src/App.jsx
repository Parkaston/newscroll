import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Categoria from "./pages/Categoria";
import Favoritas from "./pages/Favoritas";
import Busqueda from "./pages/Busqueda";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/top" replace />} />

      <Route element={<Layout />}>
        <Route path=":categoria" element={<Categoria />} />
        <Route path="favoritas" element={<Favoritas />} />
        <Route path="buscar" element={<Busqueda />} />
        <Route path=":categoria/buscar" element={<Busqueda />} />
      </Route>
    </Routes>
  );
}