import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminEcom } from "./context/AdminEcomProvider";

function AdminHome() {
  // const{categories}=useContext(ecomcontext)
  const { count, getCount } = useAdminEcom();

   console.log(count);
   
  useEffect(() => {
    getCount();
  }, []);
  return (
    <div className="min-h-screen flex">
    <aside className="w-1/5 p-4 pl-12 bg-gray-200 min-h-fit">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <ul className="mt-4 sticky top-0">
        <li>
          <Link to="/admin/home" className="py-3 w-full inline-block">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/categories" className="py-3 w-full inline-block">
            Categories
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="py-3 w-full inline-block">
            Products
          </Link>
        </li>
        <li>
          <Link to="" className="py-3 w-full inline-block">
            Orders
          </Link>
        </li>
        <li>
          <Link to="" className="py-3 w-full inline-block">
            Users
          </Link>
        </li>
        <li>
          <Link to="/addcoupon" className="py-3 w-full inline-block">
            Add Coupon
          </Link>
        </li>
      
      </ul>
    </aside>
    <main className="w-4/5 p-4 mt-12">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-xl font-bold">{count.products}</p>
          <div className="flex gap-4">
            <Link to="/admin/products">View Products</Link>
            <Link to="/admin/addProduct">Add Product</Link>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-xl font-bold">{count.orders}</p>
          <div className="flex gap-4">
            <Link to="">View Orders</Link>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-xl font-bold">{count.categories}</p>
          <div className="flex gap-4">
            <Link to="/admin/categories">View Categories</Link>
            <Link to="/admin/addCategory">Add Category</Link>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-xl font-bold">{count.users}</p>
          <div className="flex gap-4">
            <Link to="">View Users</Link>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}

export default AdminHome;