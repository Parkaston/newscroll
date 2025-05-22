import { createTheme } from "@mui/material/styles";



//  Hagamos un tema claro y oscuro para nuestra aplicación teniendo como referencia el diseño de Figma

//Tema Claro
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F5F5F5", // Header
    },
    secondary: {
      main: "#EFEFEF", // Sidebar
    },
    background: {
      default: "#ffffff", // Fondo general
      paper: "#ffffff",   // Tarjetas
    },
    text: {
      primary: "#000000",
    },
  },
});

//Tema oscuro

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1A1A1A", // Header
    },
    secondary: {
      main: "#121212", // Sidebar
    },
    background: {
      default: "#121212", // Fondo general
      paper: "#1E1E1E",   // Tarjetas
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});
