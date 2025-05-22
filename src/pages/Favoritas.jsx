import React from "react";
import { Container, Typography } from "@mui/material";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useFavoritos } from "../context/FavoritosContext"; // Usamos contexto global

export default function Favoritas() {
  const { favoritos, toggleFavorito } = useFavoritos();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Noticias Favoritas
      </Typography>

      {favoritos.length === 0 ? (
        <Typography variant="body2">No hay noticias favoritas.</Typography>
      ) : (
        favoritos.map((noticia, index) => (
          <TarjetaNoticia
            key={index}
            noticia={noticia}
            onFavorito={() => toggleFavorito(noticia)}
            esFavorita={true}
          />
        ))
      )}
    </Container>
  );
}
