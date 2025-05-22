import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ecomcontext } from "../context/EcomContext";
import { useAuth } from "../context/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAdminAuth } from "../admin/context/AdminAuthProvider";

function Header() {
  const { wishlist, fetchWishlist, fetchCart, clearWishlist } =
    useContext(ecomcontext);
  const { isUserLoggedIn, logout } = useAuth();
  const { isAdminLoggedIn, adminLogout } = useAdminAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isUserLoggedIn, cart]);

  async function fetchData() {
    await fetchWishlist();
    const cart = await fetchCart();
    setCart(cart);
  }
  // console.log(isUserLoggedIn , "user");

  return (
    <header className="flex justify-between items-center px-8 md:px-12 py-3 bg-white shadow-md fixed top-0 right-0 left-0 z-50">
      <Link to="/">
        <h2 className="text-2xl font-extrabold text-blue-600  hover:scale-105 transition-transform">
          Ecommerce
        </h2>
      </Link>

      <nav>
        <ul className="flex items-center space-x-6 font-semibold text-gray-700">
          <li>
            <Link className="hover:text-green-600 transition-colors" to="/">
              Home
            </Link>
          </li>

          <li>
            {isUserLoggedIn ? (
              <Link
                onClick={() => {
                  logout();
                  clearWishlist();
                }}
                className="hover:text-red-600 transition-colors"
                to="/user/login"
              >
                Logout
              </Link>
            ) : isAdminLoggedIn ? (
              <Link
                onClick={adminLogout}
                className="hover:text-red-600 transition-colors"
                to="/admin/login"
              >
                Logout
              </Link>
            ) : (
              <Link
                className="hover:text-green-600 transition-colors"
                to="/user/login"
              >
                Login
              </Link>
            )}
          </li>

          <li className="relative">
            <Link
              to="/wishlist"
              className="flex items-center hover:text-pink-600 transition-colors"
            >
              <FaHeart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                {wishlist?.length > 0 ? wishlist.length : 0}
              </span>
            </Link>
          </li>

          <li className="relative">
            <NavLink
              to="/cart"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 rounded-full">
                {cart?.length > 0 ? cart.length : 0}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
