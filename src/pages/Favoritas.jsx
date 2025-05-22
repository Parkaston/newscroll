import React from "react";
import { Container, Typography } from "@mui/material";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useFavoritos } from "../context/FavoritosContext"; // Accedemos al contexto de favoritos

export default function Favoritas() {
  const { favoritos, toggleFavorito } = useFavoritos(); // Obtenemos las noticias favoritas y la función para alternarlas

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Noticias Favoritas
      </Typography>

      {/* Muestra mensaje si no hay favoritas */}
      {favoritos.length === 0 ? (
        <Typography variant="body2">No hay noticias favoritas.</Typography>
      ) : (
        // Mapea cada noticia favorita a una tarjeta
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