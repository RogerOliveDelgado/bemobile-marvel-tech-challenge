import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY

const marvelService = axios.create({
  baseURL: baseUrl || '',
  params: {
    apikey: apiKey || '',
  },
})

export default marvelService
