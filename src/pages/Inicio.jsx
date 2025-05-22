// src/pages/Inicio.jsx
import React, { useEffect, useState } from "react";
import { obtenerNoticias } from "../services/newsService";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { Typography, Container } from "@mui/material";
import useFavoritos from "../hooks/useFavoritos"; // Hook para favoritos

export default function Inicio() {
  const [noticias, setNoticias] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const { favoritos, toggleFavorito } = useFavoritos();

useEffect(() => {
  const fetchNoticias = async () => {
    const cache = localStorage.getItem("noticias_top");
    if (cache) {
      setNoticias(JSON.parse(cache));
      return;
    }

    const data = await obtenerNoticias();
    setNoticias(data);
    localStorage.setItem("noticias_top", JSON.stringify(data));
  };

  fetchNoticias();
}, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Últimas Noticias
      </Typography>

      {noticias.length === 0 ? (
        <Typography variant="body2">No hay noticias disponibles.</Typography>
      ) : (
        noticias.map((noticia, index) => (
          <TarjetaNoticia
            key={index}
            noticia={noticia}
            onFavorito={(n) => {
              toggleFavorito(n);
              setActualizar(!actualizar); // Forzar re-render
            }}
            esFavorita={favoritos.some((f) => f.url === noticia.url)}
          />
        ))
      )}
    </Container>
  );
}
