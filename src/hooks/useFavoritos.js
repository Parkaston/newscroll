// Hook personalizado para manejar favoritos en localStorage
import { useState, useEffect } from "react";

// Clave que se usará en localStorage
const CLAVE = "noticiasFavoritas";

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Al iniciar, cargamos los favoritos desde localStorage
  useEffect(() => {
    const guardados = localStorage.getItem(CLAVE);
    if (guardados) {
      setFavoritos(JSON.parse(guardados));
    }
  }, []);

  // Actualiza localStorage cuando cambian los favoritos
useEffect(() => {
  console.log("🔐 Favoritos actualizados:", favoritos);
  localStorage.setItem(CLAVE, JSON.stringify(favoritos));
}, [favoritos]);
  // Agregar una noticia si no está, o quitarla si ya está
  const toggleFavorito = (noticia) => {
    const yaExiste = favoritos.some((n) => n.url === noticia.url);
    if (yaExiste) {
      setFavoritos(favoritos.filter((n) => n.url !== noticia.url));
    } else {
      setFavoritos([...favoritos, noticia]);
    }
  };

  return { favoritos, toggleFavorito };
}
