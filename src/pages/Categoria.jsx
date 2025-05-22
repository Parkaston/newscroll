import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { obtenerNoticiasPorCategoria } from "../services/newsService";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useFavoritos } from "../context/FavoritosContext";

export default function Categoria() {
  // ✅ Obtenemos la categoría desde la URL
  const { categoria } = useParams();

  const [noticias, setNoticias] = useState([]);
  const { favoritos, toggleFavorito } = useFavoritos();

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerNoticiasPorCategoria(categoria);
      setNoticias(data);
    };

    fetchData();
  }, [categoria]); // ✅ Dependencia correcta

  return (
    <Container
      maxWidth={false} // 🛑 Desactiva el límite de ancho tipo "lg"
      disableGutters // 🧼 Elimina padding lateral automático
      sx={{ mt: 4, px: 2 }} // ✅ Si querés un poco de margen horizontal
    >
      <Typography variant="h5" gutterBottom>
        Noticias de {categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : ""}
      </Typography>

      {noticias.length === 0 ? (
  <Typography variant="body2">
    No se encontraron noticias para esta categoría.
  </Typography>
) : (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
    {noticias.map((noticia) => (
      <TarjetaNoticia
        key={noticia.link}
        noticia={noticia}
        onFavorito={() => toggleFavorito(noticia)}
        esFavorita={favoritos.some((f) => f.link === noticia.link)}
      />
    ))}
  </Box>
)}
      
    </Container>
  );
}
