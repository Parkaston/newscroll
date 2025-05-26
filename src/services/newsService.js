// Clave de API y URL base para consumir NewsData.io
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://newsdata.io/api/1/news";

// Mapea las categorías internas a las que entiende la API
const categoriasMapeadas = {
  politica: "politics",
  tecnologia: "technology",
  deportes: "sports",
  clima: "environment",
  salud: "health",
  ciencia: "science",
  negocios: "business",
  entretenimiento: "entertainment",
  comida: "food",
  mundo: "world",
  top: "top",
};

// Función principal para hacer peticiones a la API de noticias
export const obtenerNoticias = async (opciones = {}) => {
  const { categoria, pais = "ar", page = null, fuente = "" } = opciones;

  // Limpia la categoría si viene con token de paginación, como "sports:1"
  const categoriaLimpia = categoria?.split(":")[0];
  const categoriaAPI = categoriasMapeadas[categoriaLimpia] || categoriaLimpia || "top";

  // Construye los parámetros de la URL
  const params = new URLSearchParams({
    apikey: API_KEY,
    language: "es",
  });

  if (page) params.append("page", page); // Token de paginación
if (fuente) {
  params.append("domainurl", fuente);
}
if (categoriaAPI && !fuente) {
  // Si no estás filtrando por fuente, podés usar categoría
  params.append("category", categoriaAPI);
} else if (!categoriaAPI && !fuente) {
  // Si no hay categoría ni fuente, filtrá por país
  params.append("country", pais);
}

  try {
    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    // Verificación de errores o datos inválidos
    if (data.status === "error" || !Array.isArray(data.results)) {
     
      return { results: [], nextPage: null };
    }

    return {
      results: data.results,
      nextPage: data.nextPage || null, // Devuelve token de paginación si existe
    };
  } catch (error) {
    
    return { results: [], nextPage: null };
  }
};

// Función secundaria que obtiene noticias por categoría y puede usar caché local
export const obtenerNoticiasPorCategoria = async (
  categoria,
  nextPage = null,
  usarCache = false,
  fuente = ""
) => {
  const cacheKey = `noticias_${categoria}_${nextPage || "inicio"}`;

  // Verifica y devuelve caché si está activado y disponible
  if (usarCache) {
    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }
  }

  const data = await obtenerNoticias({ categoria, page: nextPage, fuente });

  // Guarda en caché si está activado
  if (usarCache) {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  }

  return data; // Devuelve { results, nextPage }
};