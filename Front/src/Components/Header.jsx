import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ecomcontext } from "../context/EcomContext";
import { useAuth } from "../context/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAdminAuth } from "../admin/context/AdminAuthProvider";

function Header() {
  const { wishlist, fetchWishlist, fetchCart ,clearWishlist} = useContext(ecomcontext);
  const { isUserLoggedIn, logout } = useAuth();
  const { isAdminLoggedIn, adminLogout } = useAdminAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isUserLoggedIn]);

  async function fetchData() {
    await fetchWishlist();
    const cart = await fetchCart();
    setCart(cart);
  }
// console.log(isUserLoggedIn , "user");


  return (
    <header className="flex justify-between px-12 py-2 bg-green-300 fixed top-0 right-0 left-0 ">
      <Link to="/">
        <h2 className="text-2xl font-bold">Ecommerce</h2>
      </Link>
      <nav>
        <ul className="flex py-1 mx-4  font-medium ">
          <li className="mx-4">
            <Link to="/">Home</Link>
          </li>

          <li className="mx-4">
            {isUserLoggedIn ? (
              <Link onClick={()=>{logout(); clearWishlist()}} to={`/user/login`}>
                Logout
              </Link>
            ) : isAdminLoggedIn ? (
              <Link onClick={adminLogout} to={`/admin/login`}>
                Logout
              </Link>
            ) : (
              <Link to="/user/login">Login</Link>
            )}
          </li>
          <li>
            <Link to="/wishlist">
              <p className="flex items-center relative mt-1 mr-3 text-xl">
                <span className="absolute right-[-13px] top-[-12px] rounded-full bg-red-600 text-white px-[5px] mt-1 text-xs">
                  {wishlist?.length > 0 ? wishlist.length : 0}
                </span>
                <span className="px-1">
                  <FaHeart />
                </span>
              </p>
            </Link>
          </li>
          <li className="md:px-2 ">
            <NavLink to="/cart">
              <p className="flex relative">
                Cart
                <span className="absolute right-[-14px] top-[-9px] rounded-full bg-red-600 text-white px-[5px] mt-1 text-xs">
                  {cart?.length > 0 ? cart.length : 0}
                </span>
                <FaShoppingCart className="text-lg mt-1" />
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
