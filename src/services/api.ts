import axios from 'axios'

const BASE_URL = 'https://solinca-notif-portal-apis.herokuapp.com/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

export { api }
