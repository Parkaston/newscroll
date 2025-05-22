import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritosProvider } from './context/FavoritosContext'; // importa el nuevo provider
import { CustomThemeProvider } from './ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <FavoritosProvider>
          <App />
        </FavoritosProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);