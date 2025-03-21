/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom"
import { ecomcontext } from "../context/EcomContext"
import { useContext, useEffect } from "react"
import Loader from "../Components/Loader"
import DisplayProduct from "../Components/DisplayProduct"

function ShopByCategory() {

    const { categoryId } = useParams()

    const { filterByCategory, productByCat,categories, loading } = useContext(ecomcontext)

    useEffect(() => {
        if (categoryId) {
            filterByCategory(categoryId)
        }
    }, [categoryId])

    
    return loading ? <Loader /> :
    <div className="section w-[full] flex flex-wrap gap-8 h-screen ">
          <aside className="sidebar w-[20%] pl-4  pt-4 border-gray-600 border-r-2 bg-gray-200">
          <div className="  sticky top-20 ">
            <h2 className='text-blue-800 ml-8 text-2xl font-bold mt-2 '>Category </h2>
            <div className="categorylist ">
              {categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <li key={index} className="list-none mx-5 mt-4 font-bold">
                      <Link
                        to={`/category/${category._id}`}
                        
                        className="block w-full px-4 py-1 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                        >
                        {category.name}
                      </Link>
                    </li>
                  )
                })
              }
            </div>
            <div className="px-4 py-2 mx-4 text-white font-medium mt-8 bg-red-900 ">
            <li className=" list-none " ><Link to="/hotDeals"> Hot Deals</Link> </li>
            </div>
          </div>
              </aside>
          <div className="productDisplay w-[75%]">
          <DisplayProduct product={productByCat} />
          </div>
        </div>
}

export default ShopByCategory