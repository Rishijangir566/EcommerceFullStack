import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ecomcontext } from "../context/EcomContext";

function AdminCategory() {
    const { handleDelete ,fetchCategory} = useContext(ecomcontext)
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (page > 1) fetchCategory(page);
        else fetchCategory();
      }, [page]);

      useEffect(() => {
        initial();
      }, []);

    async function initial() {
    const categories = await fetchCategory();
    setCategories(categories);
    }

      // console.log("categories", categories);

    return (
        <div className="min-h-screen flex items-stretch ">
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
        </ul>
      </aside>
      <main className="w-4/5 p-4 mt-12">
        <h2 className="text-2xl font-bold mb-3 flex justify-between items-center">
          Categories
          <Link
            to="/admin/addCategory"
            className="bg-green-700 border-2 border-green-700 rounded-lg text-white font-normal text-[16px] px-4"
          >
            Add New
          </Link>
        </h2>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Icon</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => {
              return (
                <tr
                  key={item._id}
                  className={`mb-2 ${
                    index % 2 === 0 ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="p-2">
                    <p className="capitalize">{item.name}</p>
                  </td>
                  <td className="p-2">
                    <img
                      src={item.image}
                      className="w-20 h-20 object-contain"
                      alt=""
                    />
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white p-1 rounded"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination my-3">
          {categories?.currentPage > 1 && (
            <Link
              to={`?page=${categories?.currentPage - 1}`}
              className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
              onClick={() => setPage(categories.currentPage - 1)}
            >
              Previous
            </Link>
          )}

          {Array.from({ length: categories?.totalPages }).map((_, index) => {
            return (
              <Link
                key={index}
                to={`?page=${index + 1}`}
                className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </Link>
            );
          })}

          {categories?.currentPage < categories?.totalPages && (
            <Link
              to={`?page=${categories?.currentPage + 1}`}
              className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
              onClick={() => setPage(categories?.currentPage + 1)}
            >
              Next
            </Link>
          )}
        </div>
      </main>
    </div>


    )
}

export default AdminCategory