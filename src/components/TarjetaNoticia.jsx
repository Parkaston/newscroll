import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
const imagenFallback = "/sin-imagen.jpg";


export default function TarjetaNoticia({ noticia, onFavorito, esFavorita }) {
  const { title, description, link, image_url } = noticia;

  return (
    <Card
  sx={{
    display: "flex",
    mb: 2,
    alignItems: "center",
    width: "100%", 
  }}
>
  <CardMedia
    component="img"
    sx={{
      width: 160,
      height: 160,
      objectFit: "cover",
      alignSelf: "center",
    }}
    image={image_url || imagenFallback}
    alt={title}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = imagenFallback;
    }}
  />


      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ mb: 1 }}
          >
            {description || "Sin descripción disponible."}
          </Typography>
          <Typography
  variant="body2"
  component="div"
  sx={{
    a: {
      color: "text.primary",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  }}
>
  <a href={link} target="_blank" rel="noopener noreferrer">
    Leer más
  </a>
</Typography>
        </CardContent>

        <Box sx={{ alignSelf: "flex-end", p: 1 }}>
          <IconButton onClick={() => onFavorito(noticia)}>
            {esFavorita ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
