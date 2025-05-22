import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useFavoritos } from "../context/FavoritosContext";
import { obtenerNoticiasPorCategoria, obtenerNoticias } from "../services/newsService";

export default function Busqueda() {
  const [searchParams] = useSearchParams();
  const { categoria } = useParams(); 
  const query = searchParams.get("q")?.toLowerCase() || ""; 
  const [resultados, setResultados] = useState([]);
  const { favoritos, toggleFavorito } = useFavoritos();

  // Traducción para las categorias, para mostrar en el titulo
  const nombreCategoria = {
    top: "Destacadas",
    deportes: "Deportes",
    politica: "Política",
    economia: "Economía",
    tecnologia: "Tecnología",
    clima: "Clima",
    salud: "Salud",
    ciencia: "Ciencia",
  };

  // Hacemos la busqueda al cargar la pagina o hacer un cambio en el query
  useEffect(() => {
    const fetchData = async () => {
      let noticias = [];

      if (categoria) {
        // Si hay categoría, buscamos solo ahí
        noticias = await obtenerNoticiasPorCategoria(categoria);
      } else {
        // Si no hay categoría, buscamos en varias
        const categorias = ["deportes", "politica", "tecnologia", "clima", "economia"];
        const todas = await Promise.all(categorias.map(cat => obtenerNoticiasPorCategoria(cat, false)));
        noticias = todas.flat();
      }

      // Filtramos por título o descripción que coincida con el query
      const filtradas = noticias.filter(noticia =>
        noticia.title?.toLowerCase().includes(query) ||
        noticia.description?.toLowerCase().includes(query)
      );

      setResultados(filtradas);
    };

    fetchData();
  }, [query, categoria]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Resultados para: "{query}" en {nombreCategoria[categoria || "top"]}
      </Typography>

      {resultados.length === 0 ? (
        <Typography variant="body2">No se encontraron noticias.</Typography>
      ) : (
        resultados.map(noticia => (
          <TarjetaNoticia
            key={noticia.link}
            noticia={noticia}
            onFavorito={() => toggleFavorito(noticia)}
            esFavorita={favoritos.some(f => f.link === noticia.link)}
          />
        ))
      )}
    </Container>
  );
}