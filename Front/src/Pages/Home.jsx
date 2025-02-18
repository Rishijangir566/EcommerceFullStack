import { useContext, useEffect } from "react"
// import instance from "../axiosConfig"
import { ecomcontext } from "../context/EcomContext"
import Loader from "../Components/Loader"
import DisplayProduct from "../Components/DisplayProduct"

function Home() {
  const { loading, products, fetchProducts } = useContext(ecomcontext)


  useEffect(() => {
    fetchProducts()
  }, [])

  return (loading) ? <Loader /> : <DisplayProduct product={products} />

}

export default Home