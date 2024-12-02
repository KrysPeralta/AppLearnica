//EL NOMBRE DEL ARCHIVO ES: apiService.ts
import axios from 'axios';

const BASE_URL = 'https://learnicapi.duckdns.org/api/'; // URL base de la API

// Configuración global de Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Obtener una lista de datos o un registro por ID
  getData: (endpoint: string, id?: number) => {
    if (id) {
      return apiClient.get(`${endpoint}${id}/`);
    }
    return apiClient.get(endpoint);
  },

  // Crear datos
  createData: (endpoint: string, data: any) => {
    return apiClient.post(endpoint, data);
  },

  // Actualizar datos por ID
  updateData: (endpoint: string, id: number, data: any) => {
    return apiClient.put(`${endpoint}${id}/`, data);
  },

  // Eliminar datos por ID
  deleteData: (endpoint: string, id: number) => {
    return apiClient.delete(`${endpoint}${id}/`);
  },
};

