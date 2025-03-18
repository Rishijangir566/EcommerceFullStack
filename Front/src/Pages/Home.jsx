import { useContext, useEffect } from "react"
// import instance from "../axiosConfig"
import { ecomcontext } from "../context/EcomContext"
import Loader from "../Components/Loader"
import DisplayProduct from "../Components/DisplayProduct"
import { Link } from "react-router-dom"

function Home() {
  const { loading, product, fetchAllProducts, categories, fetchCategory } = useContext(ecomcontext)


  useEffect(() => {
    fetchAllProducts()
    fetchCategory()
  }, [])

  return (loading) ? <Loader /> :
    <div className="section w-[full] flex">

      <div className="sidebar w-[25%]  ml-4 pt-4 border-gray-600 border-r-2  ">
        <h2 className='text-blue-800 ml-8 text-3xl font-bold mt-2 '>Category </h2>
        <div className="categorylist ">
          {categories.length > 0 &&
            categories.map((category, index) => {
              return (
                <li key={index} className="list-none mx-5 mt-4 font-bold">
                  <Link
                    to={`/category/${category.name.toLowerCase()}`}

                    className="block w-full px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                  >
                    {category.name}
                  </Link>
                </li>
              )
            })
          }
        </div>
        <div className="px-4 mx-4 text-white font-bold mt-8 bg-red-900 ">
        <li className=" list-none " ><Link to="/hotDeals"> Hot Deals</Link> </li>
        </div>
      </div>
      <div className="productDisplay w-[75%]">
      <DisplayProduct product={product} />
      </div>
    </div>


}

export default Home