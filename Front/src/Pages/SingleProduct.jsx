import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import instance from "../axiosConfig"
import { ecomcontext } from "../context/EcomContext"
import DisplayProduct from "../Components/DisplayProduct"
import { useAuth } from "../context/AuthProvider"

function SingleProduct() {
    const { addToCart, existsInCart, removeFromCart, filterByCategory, productByCat, categories } = useContext(ecomcontext)

  const {isUserLoggedIn}=useAuth()
  const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProdct] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoryName, setCategoryName] = useState("")
    useEffect(() => {
        if (id) {
            fetchSingleProduct(id)
        }
        if (product.category) {
            setCategoryName(
                categories.find((obj) => {
                    return obj._id === product.category;
                }).name
            )
        }
    }, [id, product.category])

    useEffect(() => {
        filterByCategory(categoryName);
    }, [categoryName])



    async function fetchSingleProduct(id) {
        try {
            setLoading(false)
            const response = await instance.get(`/product/get/${id}`)
            // console.log(response.data);
            setProdct(response.data[0])
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    function userCartAuthentication(){
        if(isUserLoggedIn){
            addToCart(product)
        } 
        else{
            navigate("/user/login/?referer="+ window.location.href)
        }
    }



    if (loading) return <h2> Loading ...</h2>
    return (
        <>
            {
                <div className="flex m-12 ">
                    <div className="w-[20rem] my-4 mr-8" > <img className="mr-8" src={product.image} alt="" /></div>
                    <div className="text-xl font-medium">
                        <h2 className="my-2"> <strong>Name :- </strong> {product.title}</h2>
                        {/* <p className="my-2">  <strong> Rating  :- </strong> {product.totalRating}</p> */}
                        <h2 className="my-2"> <strong>Price  :- </strong> {product.discountPrice}</h2>
                        <h2 className="my-2"> <strong>Brand  :- </strong> {product.brand}</h2>
                        <h2 className="my-2"> <strong>Category  :- </strong> {categoryName}</h2>
                        <h2 className="my-4"> <strong>Description  :- </strong> {product.description}</h2>
                        {/* <p className="my-2" style={{ color: product.inStock ? "white" : "red" }}> Out Of Stock </p> */}

                        <div>
                            {
                                existsInCart(product._id) ? (

                                    <button className="py-1 px-4  rounded bg-red-500 mr-4 hover:bg-cyan-200" onClick={() => removeFromCart(product._id)}> Remove From Cart</button>
                                ) : (
                                    <button className="py-1 px-4  rounded bg-cyan-500 mr-4 hover:bg-cyan-200" onClick={userCartAuthentication}> Add To Cart</button>
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