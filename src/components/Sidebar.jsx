import {
  Drawer,
  Box,
  Typography,
  Grid,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import GavelIcon from "@mui/icons-material/Gavel";
import MemoryIcon from "@mui/icons-material/Memory";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StarIcon from "@mui/icons-material/Star";
import PublicIcon from "@mui/icons-material/Public";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ScienceIcon from "@mui/icons-material/Science";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";

const drawerWidth = 240;

const items = [
  { text: "Clima", icon: WbSunnyIcon, path: "/environment" },
  { text: "Política", icon: GavelIcon, path: "/politics" },
  { text: "Tecnología", icon: MemoryIcon, path: "/technology" },
  { text: "Deportes", icon: SportsSoccerIcon, path: "/sports" },
  { text: "Salud", icon: LocalHospitalIcon, path: "/health" },
  { text: "Ciencia", icon: ScienceIcon, path: "/science" },
  { text: "Negocios", icon: BusinessCenterIcon, path: "/business" },
  { text: "Comida", icon: FastfoodIcon, path: "/food" },
  { text: "Entretenimiento", icon: MovieIcon, path: "/entertainment" },
  { text: "Mundo", icon: PublicIcon, path: "/world" },
  { text: "Favoritas", icon: StarIcon, path: "/favoritas" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: theme.palette.secondary.main,
        flex: 1,
        p: 2,
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Espaciador que coincide con el marginTop del Drawer */}
      <Box sx={{ height: "112px" }} />

      {/* Título de sección */}
      <Typography
        variant="subtitle1"
        sx={{
          mb: 2,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1rem",
          letterSpacing: "0.5px",
          color: theme.palette.text.secondary,
          textTransform: "uppercase",
          borderBottom: `2px solid ${theme.palette.divider}`,
          pb: 1,
        }}
      >
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
                  <IconButton>
                    <Icon
                      fontSize="large"
                      sx={{ color: isActive ? "primary.main" : "inherit" }}
                    />
                  </IconButton>

                  <Typography
                    variant="caption"
                    sx={{
                      color: isActive
                        ? "primary.main"
                        : theme.palette.text.primary,
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
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: theme.palette.secondary.main,
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: theme.palette.secondary.main,
          boxSizing: "border-box",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
