import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { ecomcontext } from "../context/EcomContext";

function Header() {
  const { cart, categories, fetchCategory } = useContext(ecomcontext)

  const [dropdownOpen, setDropdownOpen] = useState(false)



  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <header className="flex justify-between px-12 py-2 bg-green-300">
     <Link to="/"> <h2 className="text-2xl font-bold">Ecommerce</h2></Link>
      <nav>
        <ul className="flex py-1 ">
          <li className="mx-4"><Link to="/">Home</Link> </li>
        

          <li className="mx-4">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="rounded-lg px-3 text-center inline-flex items-center relative cursor-pointer"
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Shop By Category
              <svg
                className="w-2.5 h-2.5 ms-3 transition-all duration-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                style={dropdownOpen ? { transform: "rotate(180deg)" } : {}}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div id="dropdown"
              className={`z-1 ${dropdownOpen ? "block" : "hidden"} bg-white devide-y divide-gray-100 shadow-sm dark:bg-blue-400 absolute pl-4 mt-3 w-44`}
            >
              <ul className="py-2 text-sm text-black dark:text-black"
                aria-labelledby="dropdownDefaultButton"
              >
                {categories.length > 0 &&
                  categories.map((category, index) => {
                    return (
                      <li key={index}className="py-1">
                        <a href={`/category/${category.category.toLowerCase()}`}>
                          {category.category}
                        </a>
                      </li>
                    )
                  })
                }
              </ul>

            </div>


          </li>
     <li> <Link to="/register">Login</Link> </li>

          <li className="mx-4 relative"><Link to="/cart">Cart</Link> <span className="absolute top-[-5px] right-[-20px] text-white bg-red-500 rounded-full px-1.5  text-sm"> {cart.length}</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header