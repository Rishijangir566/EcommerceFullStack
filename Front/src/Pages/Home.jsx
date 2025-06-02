import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
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

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="section flex flex-col md:flex-row gap-4 md:gap-8 px-4 ">
        {/* Sidebar */}
        <aside className="w-full md:w-[20%] border-r border-gray-300 bg-gray-100 md:sticky md:top-[5rem] rounded-md shadow-sm px-4 py-18">
          <Link to="/" className="block mb-4">
            <h2 className="text-blue-600 text-2xl font-bold pl-4">
              Category
            </h2>
          </Link>

          <ul className="space-y-2">
            {categories?.length > 0 &&
              categories.map((category, index) => (
                <li key={index} className="list-none uppercase">
                  <NavLink
                    to={`/category/${category.name.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md text-gray-700 hover:bg-green-200 transition ${
                        isActive ? "bg-green-300 font-semibold " : ""
                      }`
                    }
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
          </ul>

          <div className="mt-6">
            <Link
              to="/hotDeals"
              className="block text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition"
            >
              🔥 Hot Deals
            </Link>
          </div>
        </aside>

        {/* Product Display */}
        <div className="w-full md:w-[80%]">
          <DisplayProduct
            product={productByCat?.product?.length > 0 ? productByCat : product}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
