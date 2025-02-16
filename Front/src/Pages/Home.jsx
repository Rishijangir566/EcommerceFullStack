import { useContext, useEffect } from "react"
// import instance from "../axiosConfig"
import { Link } from "react-router-dom"
import { ecomcontext } from "../context/EcomContext"

function Home() {
  const { loading, products, fetchProducts } = useContext(ecomcontext)


  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) return <h2> Loading ...</h2>
  return (
    <>
      <div className="flex justify-evenly gap-12 flex-wrap mt-12 ">

        {
          products.length > 0 ? (
            products.map((item) => {
              return <div key={item._id} className="text-center ">
                <Link to={`/product/${item._id}`}> <img className="w-[12rem] h-[12rem] object-contain " src={item.url} /> </Link>
                <h2 className="mt-4 font-bold ">{item.name.split(" ").slice(0, 3).join(" ") + "..."}</h2>
                <p className="text-blue-700 my-2"> $ {item.price}</p>
                <button className="py-1 px-4 border rounded" ><Link to={`/product/${item._id}`}> Add To Wishlist </Link></button>
                
              </div>
            })
          ) : ""
        }
      </div>
    </>
  )
}

export default Home