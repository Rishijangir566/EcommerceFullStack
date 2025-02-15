import { Link } from "react-router-dom"
import { useContext } from "react";
import { ecomcontext } from "../context/EcomContext";

function Header() {
  const { cart } = useContext(ecomcontext)
  return (
    <header className="flex justify-between px-12 py-2 bg-green-300">
      <h2 className="text-2xl font-bold">Ecommerce</h2>
      <nav>
        <ul className="flex py-1 ">
          <li className="mx-4"><Link to="/">Home</Link> </li>
          <li className="mx-4"><Link to="/about">About</Link> </li>
          <li className="mx-4"><Link to="/contact">Contact</Link> </li>
          <li className="mx-4 relative"><Link to="/cart">Cart</Link> <span className="absolute top-[-5px] right-[-20px] text-white bg-red-500 rounded-full px-1.5  text-sm"> {cart.length}</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header