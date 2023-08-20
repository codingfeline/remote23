import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://remoteapi.in-kent.uk/api'
})

export default instance