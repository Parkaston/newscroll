import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerNoticiasPorCategoria } from "../services/newsService";
import TarjetaNoticia from "../components/TarjetaNoticia";
import { useFavoritos } from "../context/FavoritosContext";
import { Button, Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function Categoria() {
  const { categoria } = useParams();
  const [noticias, setNoticias] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [fuente, setFuente] = useState("")
  const { favoritos, toggleFavorito } = useFavoritos();
  const [mensajeError, setMensajeError] = useState("");

  // Traducción para las categorias, para mostrar en el titulo
const nombresCategoria = {
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
  
  // Reiniciar al cambiar de categoría
  useEffect(() => {
    setNoticias([]);
    setNextPage(null);
    cargarNoticias(null); // página inicial
  }, [categoria, fuente]);
  
  useEffect(() => {
  if (fuente) {
    localStorage.setItem("fuenteSeleccionada", fuente);
  }
}, [fuente]);

  // Función para cargar noticias
const cargarNoticias = async (pageToken = null) => {
  const { results, nextPage: nuevaPagina } = await obtenerNoticiasPorCategoria(
    categoria,
    pageToken,
    false,
    fuente
  );

  if (results.length === 0) {
  if (fuente) {
    const nombreVisible =
      {
        "cnn.com": "CNN",
        "bbc.com": "BBC",
        "elpais.com": "El País",
        "clarin.com": "Clarín",
        "infobae.com": "Infobae",
      }[fuente] || fuente;

    setMensajeError(
      `No hay noticias en tu idioma de esta categoría en ${nombreVisible} actualmente.`
    );
  } else {
    setMensajeError("No hay noticias disponibles para esta categoría.");
  }
} else {
  setMensajeError(""); // Limpiar si hay noticias
}


  setNoticias((prev) => [...prev, ...results]);
  setNextPage(nuevaPagina);
};

  return (
    <div>

      <FormControl fullWidth sx={{ mb: 2 }}>
         <InputLabel id="fuente-label">Filtrar por fuente</InputLabel>
           <Select
              labelId="fuente-label"
              value={fuente}
              label="Filtrar por fuente"
              onChange={(e) => setFuente(e.target.value)}
       >
<MenuItem value="">Todas</MenuItem>
<MenuItem value="cnn.com">CNN</MenuItem>
<MenuItem value="bbc.com">BBC</MenuItem>
<MenuItem value="elpais.com">El País</MenuItem>
<MenuItem value="infobae.com">Infobae</MenuItem>
<MenuItem value="clarin.com">Clarín</MenuItem>
      </Select>
       </FormControl>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
           Noticias de {nombresCategoria[categoria] || categoria}
        </Typography>

{mensajeError && (
  <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
    {mensajeError}
  </Typography>
)}
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
