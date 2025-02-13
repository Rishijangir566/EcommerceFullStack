import { createContext, useState } from "react"
import instance from "../axiosConfig"

 export const ecomcontext =createContext();
function EcomContext({children}) {
 
   const [loading,setLoading]=useState(true)
   const [products,setProducts]=useState([])
   const [cart,setCart]=useState([])

   async function fetchProducts(){
    try{
     setLoading(true)
      const response =await instance.get("/product")
      console.log(response.data); 
      setProducts(response.data)    
   }catch(error){
     console.log(error);
     
   } finally{
     setLoading(false)
   }
   }

   function addToCart(product){
        const obj = {product,quantity:1}
       setCart([...cart,obj])
   }

  return (
    <ecomcontext.Provider value={{loading,products,cart,addToCart,fetchProducts}}>
     { children}
    </ecomcontext.Provider>
  )
}

export default EcomContext