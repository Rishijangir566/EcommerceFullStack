import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ecomcontext } from "../context/EcomContext";
import { useAuth } from "../context/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAdminAuth } from "../admin/context/AdminAuthProvider";

function Header() {
  const {wishlist ,fetchWishlist } = useContext(ecomcontext);
  const { isUserLoggedIn, logout } = useAuth();
  const { isAdminLoggedIn, adminLogout } = useAdminAuth();

  useEffect(() => {
    fetchData();
  }, [isAdminLoggedIn]);

  async function fetchData() {
   await fetchWishlist();
  }
  // console.log(wishlist);
  

  return (
    <header className="flex justify-between px-12 py-2 bg-green-300 fixed top-0 right-0 left-0 ">
      <Link to="/">
        <h2 className="text-2xl font-bold">Ecommerce</h2>
      </Link>
      <nav>
        <ul className="flex py-1 mx-4  font-medium ">
          <li className="mx-4">
            <Link to="/">Home</Link>{" "}
          </li>

          <li className="mx-4">
            {isUserLoggedIn ? (
              <Link onClick={logout} to={`/user/login`}>
                Logout
              </Link>
            ) : isAdminLoggedIn ? (
              <Link onClick={adminLogout} to={`/admin/login`}>
                Logout
              </Link>
            ) : (
              <NavLink to="/user/login">Login</NavLink>
            )}
          </li>
          <li>
            <Link to="/wishlist">
              <p className="flex items-center relative mt-1 mr-3 text-xl">
                
                <span className="absolute right-[-13px] top-[-12px] rounded-full bg-red-600 text-white px-[5px] mt-1 text-xs">
                  {wishlist?.length>0?wishlist.length:0}
                </span>
                <span className="px-1">
                  <FaHeart />
                </span>
              </p>
            </Link>
          </li>
          <li className="relative ml-3">
            <Link to="/cart/fetchcart">
              
              <FaShoppingCart className="text-xl mt-1" />
            </Link>
            <span className="absolute right-[-18px] top-[-5px]  text-white bg-red-500 rounded-full px-[5px]  text-xs">
              
           
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
