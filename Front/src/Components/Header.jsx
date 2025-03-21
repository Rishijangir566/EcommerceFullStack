import { Link, NavLink } from "react-router-dom"
import { useContext } from "react";
import { ecomcontext } from "../context/EcomContext";
import { useAuth } from "../context/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { useAdminAuth } from "../admin/context/AdminAuthProvider";


function Header() {
  const { cart, } = useContext(ecomcontext)
  const { isUserLoggedIn, logout } = useAuth()
  const { isAdminLoggedIn, adminLogout } = useAdminAuth();


  // const [dropdownOpen, setDropdownOpen] = useState(false)



  // useEffect(() => {
  //   fetchCategory()
  // }, [])

  return (
    <header className="flex justify-between px-12 py-2 bg-green-300 fixed top-0 right-0 left-0 ">
      <Link to="/"> <h2 className="text-2xl font-bold">Ecommerce</h2></Link>
      <nav>
        <ul className="flex py-1 mx-4  font-medium ">


          <li className="mx-8"><Link to="/">Home</Link> </li>


         
          <li className="mx-8">
            {isUserLoggedIn ? (
              <Link
                onClick={logout}
                to={`/user/login`} 
              >
                Logout
              </Link>
            ) : (isAdminLoggedIn) ? <Link
              onClick={adminLogout}
              to={`/admin/login`}
            >
              Logout
            </Link> : (
              <NavLink to="/user/login">Login</NavLink>
            )}
          </li>

          <li className="mx-8 relative"><Link to="/cart/fetchcart"> <FaShoppingCart className="text-xl mt-1" /></Link> <span className="absolute top-[-5px] right-[-20px] text-white bg-red-500 rounded-full px-1.5  text-sm"> {cart.length}</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header