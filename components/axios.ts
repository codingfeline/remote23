import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3121/api'
})

export default instance
// baseURL: 'https://remoteapi.in-kent.uk/api'