import React from "react";
import { Container, Typography } from "@mui/material";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useFavoritos } from "../context/FavoritosContext";
import { useSearchParams } from "react-router-dom";

export default function Favoritas() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const { favoritos, toggleFavorito } = useFavoritos();

  // Filtrar favoritos por el término de búsqueda (si existe)
  const filtrados = favoritos.filter(
    (noticia) =>
      noticia.title?.toLowerCase().includes(query) ||
      noticia.description?.toLowerCase().includes(query)
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Noticias Favoritas
      </Typography>

      {filtrados.length === 0 ? (
        <Typography variant="body2">
          {query
            ? `No se encontraron resultados para "${query}" en tus favoritas.`
            : "No hay noticias favoritas."}
        </Typography>
      ) : (
        filtrados.map((noticia) => (
          <TarjetaNoticia
            key={noticia.link}
            noticia={noticia}
            onFavorito={() => toggleFavorito(noticia)}
            esFavorita={true}
          />
        ))
      )}
    </Container>
  );
}
