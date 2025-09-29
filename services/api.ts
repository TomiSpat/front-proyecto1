import axios from "axios"

// Genera una entidad API para hacer solicitudes HTTP
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default api