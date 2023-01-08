import axios from "axios";

const http = axios.create({
    baseURL:   "http://localhost:8080",
    headers:{
        Authorization: localStorage.getItem('wanted_auth')
    }
})

export default http;