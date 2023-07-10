import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  //import.meta.env.VITE_API_URL,
  timeout: 3000
})

