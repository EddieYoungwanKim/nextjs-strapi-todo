import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://strapi-backend-todo.herokuapp.com/api/',
  timeout: 1000,
})
