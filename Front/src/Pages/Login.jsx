import { useState } from "react"
import { Link } from "react-router-dom"
import instance from "../axiosConfig"

function Login() {

    const [data , setData]=useState({
        email:"",
        password:""
    })
  
     function handlechange (e){
      const {name ,value} =e.target 
      setData((prev)=>{
        return {...prev,[name]:value}
     })
     }

    async function handleSubmit(e){
   e.preventDefault()
   try{
    const response = await instance.post("/user/login",data)
    console.log(response.data);
    
}catch(error){
    console.log(error);
    
}
     }

  return (
    <>
    <form action="" onSubmit={handleSubmit}>
        <input 
        type="email"
        placeholder="Enter Email"
         name="email"
         value={data.email}
         onChange={handlechange}
         className="border"
         />
        <input 
        type="password"
        placeholder="Enter Password"
         name="password"
         value={data.password}
         onChange={handlechange}
         className="border"
         />
         <button type="submit">Login </button>
    </form>
    <p>
        New User ? <Link to="/user/register"> Register</Link>
    </p>
    </>
  )
}

export default Login