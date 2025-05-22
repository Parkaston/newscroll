import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const CustomThemeContext = createContext();

export function CustomThemeProvider({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: modoOscuro ? "dark" : "light",
        primary: {
          main: modoOscuro ? "#90caf9" : "#333333", 
        },
        secondary: {
          main: modoOscuro ? "#424242" : "#f5f5f5",
        },
        background: {
          default: modoOscuro ? "#121212" : "#fafafa",
          paper: modoOscuro ? "#1e1e1e" : "#ffffff",
        },
      },
    });
  }, [modoOscuro]);

  return (
    <CustomThemeContext.Provider value={{ modoOscuro, setModoOscuro }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}
