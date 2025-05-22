// Importamos componentes esenciales de React Router para manejar las rutas de la SPA
import { Routes, Route, Navigate } from "react-router-dom";

// Importamos el layout principal que contiene el header, sidebar y outlet de contenido
import Layout from "./components/Layout";

// Importamos las páginas que se mostrarán en las distintas rutas
import Categoria from "./pages/Categoria"; 
import Favoritas from "./pages/Favoritas"; 
import Busqueda from "./pages/Busqueda";   

// Componente principal de rutas de la aplicación
export default function App() {
  return (
    <Routes>
      {/* Redirige automáticamente la ruta raíz "/" hacia "/top" */}
      <Route path="/" element={<Navigate to="/top" replace />} />

      {/* Agrupamos rutas que comparten el mismo layout */}
      <Route element={<Layout />}>
        {/* Ruta dinámica: muestra noticias de una categoría (ej: /sports, /technology, etc.) */}
        <Route path=":categoria" element={<Categoria />} />

        {/* Ruta para la sección de noticias favoritas */}
        <Route path="favoritas" element={<Favoritas />} />

        {/* Ruta general para búsqueda sin categoría específica */}
        <Route path="buscar" element={<Busqueda />} />

        {/* Ruta de búsqueda dentro de una categoría específica (ej: /sports/buscar?q=clima) */}
        <Route path=":categoria/buscar" element={<Busqueda />} />
      </Route>
    </Routes>
  );
}