import axios from "axios";

const instance = axios.create({
    // baseURL:"http://localhost:3000/api"})
    baseURL:"https://ecommercefullstack-back.onrender.com/api"})
export default instance