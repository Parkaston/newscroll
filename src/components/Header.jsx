
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Button, Toolbar, Typography, IconButton, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext, useState } from "react";
import { CustomThemeContext } from "../ThemeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";



export default function Header() {
  const { modoOscuro, setModoOscuro } = useContext(CustomThemeContext);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const partesRuta = location.pathname.split("/");
  const categoriaActual = partesRuta[1] === "categoria" ? partesRuta[2] : partesRuta[1];

    const handleBuscar = () => {
    if (query.trim()) {
      const ruta =
        categoriaActual && categoriaActual !== "buscar"
          ? `/${categoriaActual}/buscar?q=${encodeURIComponent(query.trim())}`
          : `/buscar?q=${encodeURIComponent(query.trim())}`;

      navigate(ruta);
      setQuery("");
    }
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Título izquierda */}
        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          NewScroll
        </Typography>

        {/* Menú central */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1, justifyContent: "center" }}>
          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: modoOscuro ? "#444" : "#fff",
              color: modoOscuro ? "#fff" : "#000",
              width: "200px",
            }}
          />

          {/* Botón Buscar */}
          <IconButton onClick={handleBuscar} color="inherit">
            <SearchIcon />
          </IconButton>

          {/* Botón Inicio */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{ fontWeight: "bold", ml: 2 }}
          >
            Inicio
          </Button>
        </Box>

        {/* Botón de tema derecha */}
        <IconButton
          onClick={() => setModoOscuro(!modoOscuro)}
          color="inherit"
          sx={{ flexShrink: 0 }}
        >
          {modoOscuro ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}