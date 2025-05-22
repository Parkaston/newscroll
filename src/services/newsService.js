const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://newsdata.io/api/1/news";

// Mapeo de categorías personalizadas a las de la API (ajustalo según tu app)
const categoriasMapeadas = {
  politica: "politics",
  tecnologia: "technology",
  deportes: "sports",
  clima: "environment",
};

// 🔧 Función genérica que hace la solicitud a la API
export const obtenerNoticias = async (opciones = {}) => {
  const { categoria, pais = "ar", page = null } = opciones;

  const categoriaLimpia = categoria?.split(":")[0];
  const categoriaAPI = categoriasMapeadas[categoriaLimpia] || categoriaLimpia || "top";

  const params = new URLSearchParams({
    apikey: API_KEY,
    language: "es",
  });

  if (page) {
    params.append("page", page);
  }

  if (categoriaAPI) {
    params.append("category", categoriaAPI);
  } else {
    params.append("country", pais);
  }

  try {
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.warn("⚠️ Formato inesperado de datos:", data);
      return { results: [], nextPage: null };
    }

    return {
      results: data.results,
      nextPage: data.nextPage || null,
    };
  } catch (error) {
    console.error("❌ Error al obtener noticias:", error);
    return { results: [], nextPage: null };
  }
};

// 🌐 Función específica para obtener noticias por categoría
export const obtenerNoticiasPorCategoria = async (
  categoria,
  nextPage = null,
  usarCache = false
) => {
  const cacheKey = `noticias_${categoria}_${nextPage || "inicio"}`;

  if (usarCache) {
    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      console.log(`✅ Cargando desde cache: ${cacheKey}`);
      return JSON.parse(cache);
    }
  }

  const data = await obtenerNoticias({ categoria, page: nextPage });

  if (usarCache) {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  }

  return data; // contiene { results, nextPage }
};
