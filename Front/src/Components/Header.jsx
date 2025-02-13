import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="flex justify-between px-12 py-2 bg-green-300">
      <h2 className="text-2xl font-bold">Ecommerce</h2>
      <nav>
        <ul className="flex py-1 ">
          <li className="mx-4"><Link to="/">Home</Link> </li>
          <li className="mx-4"><Link to="/about">About</Link> </li>
          <li className="mx-4"><Link to="/contact">Contact</Link> </li>
          <li className="mx-4"><Link to="/cart">Cart</Link> </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header