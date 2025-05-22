// src/services/newsService.js
const API_URL = "https://newsdata.io/api/1/news";
const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

/**
 * Obtiene noticias desde la API, con opciones opcionales como categoría o país.
 * @param {Object} opciones - Filtros opcionales (categoria, country, etc.)
 * @returns {Array} Lista de noticias o array vacío si falla.
 */
const categoriasMapeadas = {
  deportes: "sports",
  politica: "politics",
  economia: "business",
  tecnologia: "technology",
  clima: "weather",
  salud: "health",
  ciencia: "science",
  top:"top"
};
export const obtenerNoticias = async (opciones = {}) => {
  const { categoria, pais = "ar" } = opciones;
  const categoriaAPI = categoriasMapeadas[categoria] || categoria || "top";
  const params = new URLSearchParams({
      apikey: API_KEY,
      language: "es",      
});

if (categoriaAPI) {
  params.append("category", categoriaAPI);
} else {
  // Si no, usamos país como fallback
  params.append("country", pais);
}

  try {
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.warn("⚠️ Formato inesperado de datos:", data);
      return [];
    }

    return data.results;
  } catch (error) {
    console.error("❌ Error al obtener noticias:", error);
    return [];
  }
};

/**
 * Obtiene noticias filtradas por categoría.
 * @param {string} categoria - La categoría de noticias.
 */
export const obtenerNoticiasPorCategoria = async (categoria, usarCache = true) => {
  const cacheKey = `noticias_${categoria}`;

  if (usarCache) {
    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      console.log("✅ Cargando noticias desde cache:", categoria);
      return JSON.parse(cache);
    }
  }

  const data = await obtenerNoticias({ categoria });

  if (usarCache) {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  }

  return data;
};
