import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
// import About from "./Pages/About"
import First from "./First"
import Cart from "./Pages/Cart"
import SingleProduct from "./Pages/SingleProduct"
import EcomContext from "./context/EcomContext"
import ShopByCategory from "./Pages/ShopByCategory"
import AddProduct from "./admin/AddProduct"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import AuthProvider from "./context/AuthProvider"
import ProtectedRoute from "./context/ProtectedRoute"
import AdminLogin from "./admin/AdminLogin"
import AddCategory from "./admin/AddCategory"

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: "/cart",
        element: <Cart />
      },

      {
        path: "/user/register",
        element: <Register />
      },
      {
        path: "/user/login",
        element: <Login />
      },
      {
        path: "/admin/login",
        element: <AdminLogin/>
      },
      
      {
        path: "/product/:id",
        element: <SingleProduct />
      },
      
      {
        path: "/category/:categoryId",
        element: <ShopByCategory />
      },
      {
        path: "/admin/addproduct",
        element:<ProtectedRoute><AddProduct /></ProtectedRoute> 
      },
      {
        path: "/admin/addcategory",
        element:<AddCategory />
      }
    ],
  },
]);
function App() {
  return (
    <AuthProvider>   
    <EcomContext >
      <RouterProvider router={router} />
    </EcomContext>
    </AuthProvider>
  )
}

export default App