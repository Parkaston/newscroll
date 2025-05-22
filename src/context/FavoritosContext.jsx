import React, { createContext, useContext, useEffect, useState } from "react";

// Clave de localStorage
const CLAVE = "noticiasFavoritas";

// Creamos el contexto
const FavoritosContext = createContext();

// Hook personalizado para usar el contexto
export const useFavoritos = () => useContext(FavoritosContext);

// Proveedor del contexto
export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  // Cargamos desde localStorage al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem(CLAVE);
    if (guardados) {
      setFavoritos(JSON.parse(guardados));
    }
  }, []);

  // Guardamos en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(favoritos));
  }, [favoritos]);

  // Alterna favorito ON/OFF
const toggleFavorito = (noticia) => {
  const existe = favoritos.some((n) => n.link === noticia.link);
  if (existe) {
    setFavoritos(favoritos.filter((n) => n.link !== noticia.link));
  } else {
    setFavoritos([...favoritos, noticia]);
  }
};

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
