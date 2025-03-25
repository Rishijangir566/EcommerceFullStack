import { useContext, useEffect, useState } from "react";
// import instance from "../axiosConfig"
import { ecomcontext } from "../context/EcomContext";
import Loader from "../Components/Loader";
import DisplayProduct from "../Components/DisplayProduct";
import { Link, NavLink, useParams } from "react-router-dom";

function Home() {
  const { loading, fetchProducts, fetchCategory, filterByCategory } =
    useContext(ecomcontext);
  const [categories, setCategories] = useState([]);
  const [product, setProducts] = useState([]);
  const [productByCat, setProductByCat] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 1) fetchProducts(page);
    else fetchProducts();
    fetchData();
  }, []);

  async function fetchData() {
    const products = await fetchProducts();
    setProducts(products);
    const categories = await fetchCategory();
    setCategories(categories);
  }
  const params = useParams();
  useEffect(() => {
    getProductByCat();
  }, [params]);
  
  async function getProductByCat() {
    const productByCat = await filterByCategory(params.categoryName, true);
    setProductByCat(productByCat);
  }
  console.log(categories)

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="section w-[full] flex flex-wrap gap-8 h-screen ">
        <aside className="sidebar w-[20%]  pl-4 pt-4 border-gray-600 border-r-2 bg-gray-200">
          <div className="  sticky top-20 ">
            <h2 className="text-blue-800 ml-8 text-2xl font-bold mt-2 ">
              Category{" "}
            </h2>
            <div className="categorylist ">
              {categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <li key={index} className="list-none mx-5 mt-4 font-bold">
                      <NavLink
                        to={`/category/${category.name.toLowerCase()}`}
                        className="block w-full px-4 py-1 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  );
                })}
            </div>
            <div className="px-4 py-2 mx-4 text-white font-medium mt-8 bg-red-900 ">
              <li className=" list-none ">
                <Link to="/hotDeals"> Hot Deals</Link>{" "}
              </li>
            </div>
          </div>
        </aside>
        <div className="productDisplay w-[75%]">
          <DisplayProduct
            product={productByCat?.product?.length > 0 ? productByCat : product}
          />
          <div className="pagination my-3">
            {product.currentPage > 1 && (
              <Link
                to={`?page=${product.currentPage - 1}`}
                className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                onClick={() => setPage(product.currentPage - 1)}
              >
                Previous
              </Link>
            )}

            {Array.from({ length: product.totalPages }).map((_, index) => {
              return (
                <Link
                  key={index}
                  to={`?page=${index + 1}`}
                  className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </Link>
              );
            })}

            {product.currentPage < product.totalPages && (
              <Link
                to={`?page=${product.currentPage + 1}`}
                className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                onClick={() => setPage(product.currentPage + 1)}
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
