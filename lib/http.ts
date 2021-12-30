import axios from 'axios'

// const token = 'sdf'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    // Authorization: `Bearer ${token}`,
  },
})
