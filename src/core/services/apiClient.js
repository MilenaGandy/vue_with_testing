// src/core/services/apiClient.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Verificación crítica al inicio: si la URL base no está, la aplicación no puede funcionar con la API.
if (!API_BASE_URL) {
  const errorMessage = "FATAL ERROR: La variable de entorno VITE_API_BASE_URL no está definida. La aplicación no puede realizar llamadas a la API. Revisa tu archivo .env y la configuración de tu entorno.";
  console.error(errorMessage);
  // Es buena idea lanzar un error aquí para detener la inicialización si es un fallo crítico.
  throw new Error(errorMessage);
}

/**
 * Función genérica para realizar peticiones HTTP.
 * @param {string} endpoint - El endpoint de la API (ej. '/characters').
 * @param {RequestInit & { headers?: Record<string, string> }} options - Opciones para fetch (method, headers, body, etc.).
 * @returns {Promise<any>} - La respuesta parseada como JSON.
 * @throws {Error} - Lanza un error si la petición falla o la respuesta no es OK.
 */
async function request(endpoint, options = {}) {
  // La verificación de API_BASE_URL ya se hizo al cargar el módulo,
  // pero una comprobación aquí no está de más si la función request fuera exportada o usada de otra forma.
  // if (!API_BASE_URL) throw new Error("API Base URL no disponible en el momento de la petición.");

  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json', // Header por defecto
      ...options.headers, // Permite sobreescribir o añadir más headers
    },
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 204) { // No Content (ej. para un DELETE exitoso)
      return null;
    }

    // Intenta parsear JSON. Si falla y la respuesta no era 'ok', se lanzará un error.
    // Si es 'ok' pero no parseable (ej. cuerpo vacío en un 200), responseData será lo que devuelva .json() (puede ser error o null).
    let responseData;
    try {
      responseData = await response.json();
    } catch (jsonError) {
      // Si no se puede parsear JSON y la respuesta no fue 'ok', es un problema.
      if (!response.ok) {
        const error = new Error(response.statusText || `Error HTTP ${response.status} sin cuerpo JSON parseable.`);
        error.status = response.status;
        throw error;
      }
      // Si fue 'ok' pero no es JSON (ej. texto plano), responseData podría ser undefined o fallar.
      // Para una API estrictamente JSON, esto podría considerarse un error de API.
      // Por ahora, si fue 'ok', asumimos que si no es JSON, no hay 'datos' que devolver en ese formato.
      responseData = null; // O manejar como un error de formato de API si se espera JSON siempre.
    }

    if (!response.ok) {
      const errorMessage = responseData?.error || responseData?.message || `Error HTTP: ${response.status} ${response.statusText}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = responseData; // Adjunta el cuerpo del error si está disponible
      throw error;
    }

    return responseData;

  } catch (error) {
    // Loguear el error original si no es uno ya formateado por nosotros
    if (!(error instanceof Error && 'status' in error)) {
        console.error(`Error de red o inesperado para ${url}:`, error);
    }
    // Re-lanza el error para que el servicio/componente que llama pueda manejarlo
    throw error;
  }
}

export const apiClient = {
  get: (endpoint, params, options = {}) => {
    let urlWithParams = endpoint;
    if (params) {
      const queryParams = new URLSearchParams(params);
      const queryString = queryParams.toString();
      if (queryString) { // Solo añade '?' si hay parámetros de consulta
        urlWithParams += `?${queryString}`;
      }
    }
    return request(urlWithParams, { ...options, method: 'GET' });
  },
  post: (endpoint, body, options = {}) => {
    return request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
  },
  put: (endpoint, body, options = {}) => {
    return request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
  },
  delete: (endpoint, options = {}) => {
    return request(endpoint, { ...options, method: 'DELETE' });
  },
  // Puedes añadir 'patch' u otros métodos si los necesitas
};