import { useContext, useEffect } from "react"
import { ecomcontext } from "../context/EcomContext"
import DisplayProduct from "./DisplayProduct"
import Loader from "./Loader"

function DisplayHotDeals() {
const {fetchHotDeals , dealProducts,loading} =useContext(ecomcontext)
  useEffect(()=>{
    fetchHotDeals()
  },[])

  return (loading)? <Loader/> :<DisplayProduct product={dealProducts}/> 
}

export default DisplayHotDeals