import axios from "axios";
import Router from '../router'

const request = axios.create({
    baseURL:import.meta.env.VITE_APP_API_BASE_URL,
    timeout:6000
})
// request intercep
request.interceptors.request.use(config => {
    const token = localStorage.getItem('sitetoken')
    
    if(token) {
        config.headers['token'] = token
    }
    
    return config
})

request.interceptors.response.use(response => {
    if(response.data && response.data.code === 401) {
        Router.push('/login')
    }
    return response.data
})

export default request;