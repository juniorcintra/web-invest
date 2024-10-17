import axios, { InternalAxiosRequestConfig } from "axios";

// Criação da instância Axios com a URL base e headers iniciais.
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_LINK_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Interceptador para adicionar o token de autorização nas requisições.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const session = localStorage.getItem("@token");
    const tokenData = session ? JSON.parse(session) : null;

    if (tokenData?.access_token) {
      config.headers.Authorization = `Bearer ${tokenData.access_token}`;
    }

    return config;
  },
  (error) => {
    // Tratamento de erros ao configurar a requisição.
    return Promise.reject(error);
  },
);

export default api;
