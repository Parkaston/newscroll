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
  const fuenteParam = searchParams.get("fuente") || "";
  const [fuente, setFuente] = useState(fuenteParam);
  // Traducción para las categorias, para mostrar en el titulo
const nombreCategoria = {
  environment: "Clima",
  politics: "Política",
  technology: "Tecnología",
  sports: "Deportes",
  health: "Salud",
  science: "Ciencia",
  business: "Negocios",
  food: "Comida",
  entertainment: "Entretenimiento",
  world: "Mundo",
  top: "Top",
};

  // Hacemos la busqueda al cargar la pagina o hacer un cambio en el query
useEffect(() => {
  const fetchData = async () => {
    let noticias = [];

    if (categoria) {
      const { results } = await obtenerNoticiasPorCategoria(categoria, null, false, fuente);
      noticias = results;
    } else {
      const categorias = ["deportes", "politica", "tecnologia", "clima", "economia"];
      const todas = await Promise.all(
        categorias.map(async (cat) => {
          const { results } = await obtenerNoticiasPorCategoria(cat, null, false, fuente);
          return results;
        })
      );
      noticias = todas.flat();
    }

    const filtradas = noticias.filter(noticia =>
      noticia.title?.toLowerCase().includes(query) ||
      noticia.description?.toLowerCase().includes(query)
    );

    setResultados(filtradas);
  };

  fetchData();
}, [query, categoria, fuente]);

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