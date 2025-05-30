import React, { useContext, useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { CustomThemeContext } from "../ThemeContext";

export default function Header({ onMenuClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = theme.palette.mode === "dark";

  const { modoOscuro, setModoOscuro } = useContext(CustomThemeContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const partesRuta = location.pathname.split("/");
  const categoriaActual =
    partesRuta[1] === "categoria" ? partesRuta[2] : partesRuta[1];
  const fuente = localStorage.getItem("fuenteSeleccionada") || "";

  const logoSrc = isDark ? "/logo-dark.png" : "/logo-light.png";

  const handleBuscar = () => {
    if (query.trim()) {
      const ruta =
        categoriaActual && categoriaActual !== "buscar"
          ? `/${categoriaActual}/buscar?q=${encodeURIComponent(query.trim())}&fuente=${encodeURIComponent(fuente)}`
          : `/buscar?q=${encodeURIComponent(query.trim())}&fuente=${encodeURIComponent(fuente)}`;
      navigate(ruta);
      setQuery("");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: modoOscuro ? "#121212" : "#ffffff",
        color: modoOscuro ? "#ffffff" : "#000000",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: isMobile ? "stretch" : "center",
          gap: 1,
          px: 2,
          py: 1,
        }}
      >
        {isMobile ? (
          <>
            {/* Logo + título centrados arriba */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: 1,
              }}
            >
              <img
                src={logoSrc}
                alt="Logo NewScroll"
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                NewScroll
              </Typography>
            </Box>

            {/* Segunda fila: menú - búsqueda - modo oscuro */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                width: "100%",
              }}
            >
              {/* Menú hamburguesa */}
              <IconButton onClick={onMenuClick} color="inherit" edge="start">
                <MenuIcon />
              </IconButton>

              {/* Buscador */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexGrow: 1,
                  mx: 1,
                }}
              >
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
                    width: "100%",
                    maxWidth: "300px",
                    flexGrow: 1,
                  }}
                />
                <IconButton onClick={handleBuscar} color="inherit">
                  <SearchIcon />
                </IconButton>
              </Box>

              {/* Modo oscuro */}
              <IconButton
                onClick={() => setModoOscuro(!modoOscuro)}
                color="inherit"
              >
                {modoOscuro ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </>
        ) : (
          // Desktop
          <>
            {/* Logo + título */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src={logoSrc}
                alt="Logo NewScroll"
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                NewScroll
              </Typography>
            </Box>

            {/* Buscador + modo oscuro + inicio */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
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
                  maxWidth: "300px",
                }}
              />
              <IconButton onClick={handleBuscar} color="inherit">
                <SearchIcon />
              </IconButton>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                sx={{ fontWeight: "bold", ml: 2 }}
              >
                Inicio
              </Button>
              <IconButton
                onClick={() => setModoOscuro(!modoOscuro)}
                color="inherit"
              >
                {modoOscuro ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
