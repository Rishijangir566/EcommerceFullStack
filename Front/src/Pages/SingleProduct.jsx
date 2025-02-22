import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import instance from "../axiosConfig"
import { ecomcontext } from "../context/EcomContext"
import DisplayProduct from "../Components/DisplayProduct"

function SingleProduct() {
    const { addToCart, existsInCart, removeFromCart, filterByCategory, productByCat } = useContext(ecomcontext)
    const { id } = useParams()
    const [product, setProdct] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (id) {
            fetchSingleProduct(id)
        }
        if (product.category) {
            filterByCategory(product.category)
        }
    }, [id, product.category])

    async function fetchSingleProduct(id) {
        try {
            setLoading(false)
            const response = await instance.get(`/product/${id}`)
            // console.log(response.data);
            setProdct(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }



    if (loading) return <h2> Loading ...</h2>
    return (
        <>
            {
                <div className="flex m-12 ">
                    <div > <img className="w-[20rem] mr-8" src={product.url} alt="" /></div>
                    <div className="text-xl font-medium">
                        <h2 className="my-2"> <strong>Name :- </strong> {product.name}</h2>
                        <p className="my-2">  <strong> Rating  :- </strong> {product.totalRating}</p>
                        <h2 className="my-2"> <strong>Price  :- </strong> {product.price}</h2>
                        <h2 className="my-2"> <strong>Brand  :- </strong> {product.brand}</h2>
                        <h2 className="my-2"> <strong>Description  :- </strong> {product.description}</h2>
                        <p className="my-2" style={{ color: product.inStock ? "white" : "red" }}> Out Of Stock </p>

                        <div>
                            {
                                existsInCart(product._id) ? (

                                    <button className="py-1 px-4  rounded bg-red-500 mr-4 hover:bg-cyan-200" onClick={() => removeFromCart(product._id)}> Remove From Cart</button>
                                ) : (
                                    <button className="py-1 px-4  rounded bg-cyan-500 mr-4 hover:bg-cyan-200" onClick={() => addToCart(product)}> Add To Cart</button>
                                )
                            }
                            <button className="py-1 px-4  rounded bg-amber-300 "> Add To Wishlist</button>
                        </div>

                    </div>
                </div>


            }
            <div>
                <h2 className="text-center bg-cyan-300 font-bold text-2xl"> Simillar Products </h2>
                <DisplayProduct product={productByCat.filter((item) => item._id !== product._id)} />
            </div>
        </>
    )
}

export default SingleProduct