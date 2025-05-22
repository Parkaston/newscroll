import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerNoticiasPorCategoria } from "../services/newsService";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useFavoritos } from "../context/FavoritosContext";
import { Button, Typography } from "@mui/material";





export default function Categoria() {
  const { categoria } = useParams();
  const [noticias, setNoticias] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const { favoritos, toggleFavorito } = useFavoritos();
  const nombresCategoria = {
    environment: "Clima",
    politics: "Política",
    technology: "Tecnología",
    sports: "Deportes",
    top: "Top",
  };
  // Reiniciar al cambiar de categoría
  useEffect(() => {
    setNoticias([]);
    setNextPage(null);
    cargarNoticias(null); // página inicial
  }, [categoria]);

  // Función para cargar noticias
  const cargarNoticias = async (pageToken = null) => {
    const { results, nextPage: nuevaPagina } = await obtenerNoticiasPorCategoria(
      categoria,
      pageToken
    );

    setNoticias((prev) => [...prev, ...results]);
    setNextPage(nuevaPagina); // puede ser null si ya no hay más
  };

  return (
    <div>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
           Noticias de {nombresCategoria[categoria] || categoria}
        </Typography>

      {noticias.map((noticia, i) => (
        <TarjetaNoticia
          key={i}
          noticia={noticia}
          esFavorita={favoritos.some((n) => n.link === noticia.link)}
          onFavorito={toggleFavorito}
        />
      ))}

      {nextPage && (
        <Button
          variant="contained"
          onClick={() => cargarNoticias(nextPage)}
          sx={{ mt: 3 }}
        >
          Cargar más
        </Button>
      )}
    </div>
  );
}
