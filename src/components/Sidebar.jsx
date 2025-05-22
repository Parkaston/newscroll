// Importamos los íconos de Material UI que representan cada sección del menú
import WbSunnyIcon from "@mui/icons-material/WbSunny"; 
import GavelIcon from "@mui/icons-material/Gavel";     
import MemoryIcon from "@mui/icons-material/Memory";   
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"; 
import StarIcon from "@mui/icons-material/Star";       
import { useLocation } from "react-router-dom";
// Importamos componentes de Material UI para construir el menú lateral (En material es Drawer)
import {
  Drawer,
  Box,
  Grid,
  Typography,   
  Toolbar,
  IconButton,        
} from "@mui/material";

// Importamos Link de React Router para poder navegar entre rutas sin cambiar de página
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// El ancho de mi sidebar va a tener un ancho fijo inicialmente, de ser necesario se puede cambiar
const drawerWidth = 160;

// Definimos los ítems que van a mostrarse en el sidebar
const items = [
  { text: "Clima", icon: WbSunnyIcon, path: "/environment" },
  { text: "Política", icon: GavelIcon, path: "/politics" },
  { text: "Tecnología", icon: MemoryIcon, path: "/technology" },
  { text: "Deportes", icon: SportsSoccerIcon, path: "/sports" },
  { text: "Favoritas", icon: StarIcon, path: "/favoritas" },
];

// Creamos el sidebar como componente funcional
export default function Sidebar() {
  // Ruta actual para resaltar la opción seleccionada
  const location = useLocation();

  // 🎨 Obtenemos el tema activo (claro u oscuro)
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",

          // 🟣 Usamos el color secundario del theme como fondo del Drawer
          backgroundColor: theme.palette.secondary.main,

          // 🎨 Usamos color de texto del theme
          color: theme.palette.text.primary,
          paddingTop: "16px",
        },
      }}
    >
      {/* Deja espacio para el header */}
      <Toolbar />

      {/* Contenido del sidebar centrado */}
      <Box sx={{ textAlign: "center", px: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
          Categorías
        </Typography>

        <Grid container spacing={2} direction="column">
{items.map((item) => {
  const isActive = location.pathname === item.path;
  const Icon = item.icon;

  return (
    <Grid item key={item.text}>
      <Link to={item.path} style={{ textDecoration: "none" }}>
        <Box
          sx={{
            width: "100%",
            height: 90,
            borderRadius: 2,
            backgroundColor: isActive
              ? theme.palette.action.selected
              : theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 1,
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {/* Ícono con color dinámico aplicado directamente */}
          <IconButton>
            <Icon
              fontSize="large"
              sx={{ color: isActive ? "primary.main" : "inherit" }}
            />
          </IconButton>

          {/* Texto de la categoría con color y peso también dinámico */}
          <Typography
            variant="caption"
            sx={{
              color: isActive ? "primary.main" : theme.palette.text.primary,
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {item.text}
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
})}
          
        </Grid>
      </Box>
    </Drawer>
  );
}