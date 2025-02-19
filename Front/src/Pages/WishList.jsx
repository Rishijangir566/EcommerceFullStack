import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import instance from "../axiosConfig"
// import { ecomcontext } from "../context/EcomContext"

function WishList() {
    // const { addToCart, existsInCart, removeFromCart } = useContext(ecomcontext)
    const { id } = useParams()
    const [product, setProdct] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (id) {
            fetchSingleProduct(id)
        }
    }, [id])

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

                        {/* <div>
                            {
                                existsInCart(product._id) ? (

                                    <button className="py-1 px-4  rounded bg-red-500 mr-4 hover:bg-cyan-200" onClick={() => removeFromCart(product._id)}> Remove From WishList</button>
                                ) : (
                                    <button className="py-1 px-4  rounded bg-cyan-500 mr-4 hover:bg-cyan-200" onClick={() => addToCart(product)}> Add To Wishlist</button>
                                )
                            }


                        </div> */}

                    </div>
                </div>


            }

        </>
    )
}

export default WishList