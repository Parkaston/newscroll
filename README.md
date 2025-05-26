# 🗞️ NewScroll

**NewScroll** es una aplicación web construida con React + Material UI que permite explorar noticias por categorías, realizar búsquedas en tiempo real, guardar favoritas y navegar de forma fluida gracias a la integración con la API de [NewsData.io](https://newsdata.io).

---

## 🌟 Funcionalidades principales

- ✅ Navegación por categorías (Política, Tecnología, Clima, Deportes)
- 🔍 Búsqueda de noticias con términos personalizados
- ⭐ Sistema de favoritos (persistente con `localStorage`)
- ♾️ Paginación con botón "Cargar más", usando `nextPage` de la API
- 🌙 Modo claro/oscuro (toggle)
- 📱 Diseño responsive con Material UI

---

## 🚀 Instalación y ejecución

### 1. Cloná el repositorio

```bash
git clone https://github.com/Parkaston/newscroll
cd newscroll
```

### 2. Instalá las dependencias

```bash
npm install
```

### 3. Configurá tus variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_KEY=tu_clave_de_newsdata.io
```

Podés obtener tu clave en [newsdata.io/dashboard](https://newsdata.io/dashboard)

### 4. Ejecutá la app en desarrollo

```bash
npm run dev
```

---

## 🧱 Estructura del proyecto

```
newscroll/
├── public/
│   └── sin-imagen.jpg         # Imagen fallback
├── src/
│   ├── components/            # Header, Sidebar, TarjetaNoticia
│   ├── context/               # Contexto de favoritos
│   ├── pages/                 # Inicio, Categoria, Busqueda, Favoritas
│   ├── services/              # newsService.js (lógica API)
│   ├── ThemeContext.jsx       # Soporte para modo claro/oscuro
│   └── App.jsx                # Configuración de rutas
├── .env                       # Clave de API (no se sube)
├── .gitignore
├── vite.config.js
└── README.md
```

---

## 🛠️ Tecnologías usadas

- [React](https://reactjs.org/)
- [Material UI (MUI)](https://mui.com/)
- [React Router DOM](https://reactrouter.com/)
- [NewsData.io API](https://newsdata.io/)
- [Vite](https://vitejs.dev/)
- `localStorage` para persistencia de favoritos

---

## 📦 Scripts útiles

| Comando           | Descripción                          |
|------------------|--------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo     |
| `npm run build`   | Genera una versión optimizada        |
| `npm run preview` | Previsualiza el build localmente     |

---

## 👨‍💻 Autor

**Guillermo Luna Alvarez**  
Estudiante de Desarrollo Fullstack en [Escuela Musk](https://escuelamusk.com)  
📍 Valencia, España

---

## ⚠️ Notas

- El archivo `.env` **no se sube** por seguridad.
- La clave de NewsData.io **tiene límite diario**. Usar con precaución.
- Este proyecto está diseñado para fines educativos y de portafolio.

---

## 🏷️ Licencia

MIT – Podés usarlo, modificarlo y compartirlo libremente.
