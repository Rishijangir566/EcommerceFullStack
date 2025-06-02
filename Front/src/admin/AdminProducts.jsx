import { useContext, useEffect, useState } from "react"
import { ecomcontext } from "../context/EcomContext"
import { Link } from "react-router-dom"

function AdminProducts() {
    const { fetchProducts, handleDelete} = useContext(ecomcontext)
    const[product,setProduct]=useState([])
    const [page, setPage ] = useState(1);
    useEffect(() => {
        if (page > 1) fetchProducts(page);
        else fetchProducts();
    }, [page]);

     useEffect(() => {
        initial();
      }, []);

    console.log(fetchProducts);

    async function initial() {
    const product = await fetchProducts();
    setProduct(product);
    }

    return (
        <div className="min-h-screen  flex">
            <aside className="w-1/5 pt-4 pl-12  bg-gray-200 rounded h-screen">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <ul className="mt-4">
                    <li className="py-2">
                        <Link to="/admin/home">Dashboard</Link>
                    </li>
                    <li className="py-2">
                        <Link to="">Products</Link>
                    </li>
                    <li className="py-2">
                        <Link to="">Orders</Link>
                    </li>
                    <li className="py-2">
                        <Link to="">Users</Link>
                    </li>
                </ul>
            </aside>
            <main className="w-4/5 p-4 mt-12">
                <h2>Products</h2>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xl">
                            <th>Product Name</th>
                            <th>Original Price</th>
                            <th>Discounted Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=" ">
                        {product?.products?.map((item, index) => {
                            return (
                                <tr key={item._id} className={ `mb-2 ${index % 2 === 0 ? "bg-gray-200  " : "bg-gray-300 "
                                    }`}>
                                    <td>{item.title}</td>
                                    <td>{item.usualPrice}</td>
                                    <td>{item.discountPrice}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button className="bg-red-500 text-white p-1 rounded"
                                        onClick={()=>handleDelete(item._id ,"product")}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="pagination my-3">
                    {product.currentPage > 1 && (
                        <Link
                            to={`?page=${product.currentPage - 1}`}
                            className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                            onClick={() => { setPage(product.currentPage - 1) }}>
                            Previous
                        </Link>
                    )}

                    {Array.from({ length: product.totalPages }).map((x, index) => {
                        return (
                            <Link key={index} to={`?page=${index + 1}`}
                                onClick={() => { setPage(index + 1) }}
                                className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer">
                                {index + 1}
                            </Link>
                        )
                    })}

                    {product.currentPage < product.totalPages && (
                        <Link
                            to={`?page=${product.currentPage - 1}`}
                            className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                            onClick={() => { setPage(product.currentPage + 1) }}>
                            Next
                        </Link>
                    )}
                </div>
            </main>
        </div>
    )
}

export default AdminProducts