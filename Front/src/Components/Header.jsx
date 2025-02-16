import { Link } from "react-router-dom"
import { useContext, useEffect } from "react";
import { ecomcontext } from "../context/EcomContext";

function Header() {
  const { cart, category, fetchCategory ,selectedCategory} = useContext(ecomcontext)
  console.log(category);
  
  // const [dropdownOpen,setDropdownOpen]=useState(false)

  

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <header className="flex justify-between px-12 py-2 bg-green-300">
      <h2 className="text-2xl font-bold">Ecommerce</h2>
      <nav>
        <ul className="flex py-1 ">
          <li className="mx-4"><Link to="/">Home</Link> </li>
          <li className="mx-4"><Link to="/product/:id">WishList</Link> </li>

          <li className="mx-4">
          <button
              className="rounded-lg  text-center inline-flex items-center"
              // onClick={() => setDropdownOpen((prev) => !prev)}
            >
            Select By Category
            </button>

            <div className="  bg-amber-300 h-[22rem] pl-4 w-[12rem]   group-[.is-published]:block ">
              <ul> {
                category.length > 0 &&
                category.map((item, index) => {
                  return (
                    <li key={index} onClick={(e)=>selectedCategory(e.target.innerHTML)}><Link to=""> {item.category}</Link> </li>
                  )
                })
              }  </ul>
            </div>

          </li>


          <li className="mx-4 relative"><Link to="/cart">Cart</Link> <span className="absolute top-[-5px] right-[-20px] text-white bg-red-500 rounded-full px-1.5  text-sm"> {cart.length}</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header