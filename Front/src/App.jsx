import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import First from "./First"
import Cart from "./Pages/Cart"
import SingleProduct from "./Pages/SingleProduct"
import EcomContext from "./context/EcomContext"

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
    {
      index:true,
      element:<Home />
    },
    {
      path:"/about",
      element:<About />
    },
    {
      path:"/cart",
      element:<Cart />
    },
    {
      path:"/contact",
      element:<Contact />
    },
    {
      path:"/product/:id",
      element:<SingleProduct />
    }
  ],
  },
]);
function App() {
  return (
    <EcomContext >
      <RouterProvider router={router} />
    </EcomContext>
  )
}

export default App