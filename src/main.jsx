import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritosProvider } from './context/FavoritosContext';
import { CustomThemeProvider } from './ThemeContext';

// Punto de entrada de la aplicación: envuelve el componente principal con todos los contextos necesarios
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Habilita el sistema de rutas */}
      <CustomThemeProvider> {/* Provee el tema claro/oscuro */}
        <FavoritosProvider> {/* Maneja favoritos en localStorage */}
          <App />
        </FavoritosProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);