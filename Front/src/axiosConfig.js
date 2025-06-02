import axios from "axios";

const instance = axios.create({
  baseURL:"http://localhost:3000/api"})
//   baseURL: "https://ecommercefullstack-back.onrender.com/api",
  // baseURL:"http://localhost:3000/api"})
  // baseURL:"https://ecommercefullstack-back.onrender.com/api"})

// >>>>>>> 749400bc92bc58f6700d260c3f33df64e6283085
//   withCredentials: true,
// });
export default instance;
