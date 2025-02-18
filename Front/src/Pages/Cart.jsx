import { useContext, useEffect, useState } from "react"
import { ecomcontext } from "../context/EcomContext"
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useContext(ecomcontext)

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (cart) {
            setTotalPrice(
                cart.reduce((acc, cur) => {
                    return acc + cur.product.price * cur.quantity
                }, 0)
            )
        }
    }, [totalPrice, cart])

    console.log(cart);

    return (
        <>
            <div className="flex ">


                <div className=" w-[60rem]  m-4">

                    {cart.length === 0 ? (
                        <div>
                            <h2> Nothing to show <Link to="/" className="text-blue-700 underline"> Home Page</Link></h2>

                        </div>
                    ) : (
                        cart.map((item) => {
                            return <div key={item.product._id} className="flex   border">
                                <img className="w-[20rem] h-[20rem] object-contain p-4" src={item.product.url} />
                                <div>
                                    <h2 className="mt-12"> <strong>Name :- </strong> {item.product.name}</h2>
                                    <p className="my-2">  <strong> Rating  :- </strong> {item.product.totalRating}</p>
                                    <h2 className="my-2"> <strong>Price  :- </strong> {item.product.price}</h2>
                                    <h2 className="my-2"> <strong>Brand  :- </strong> {item.product.brand}</h2>
                                    <h2 className="my-2"> <strong>Description  :- </strong> {item.product.description}</h2>
                                    <div className="flex text-2xl">
                                        {
                                            item.quantity === 1 ? (
                                                <p className="bg-yellow-300 px-2  cursor-pointer " onClick={() => removeFromCart(item.product._id)}> <MdDeleteForever className="pt-2" /></p>
                                            ) : (
                                                <p className="bg-yellow-300 cursor-pointer px-2 " onClick={() => updateQuantity(item.product._id, "-")}> - </p>
                                            )
                                        }
                                        <p className="px-8 border  mx-1">{item.quantity}</p>
                                        <p className="bg-yellow-300 px-2 cursor-pointer" onClick={() => updateQuantity(item.product._id, "+")} > + </p>
                                    </div>
                                </div>
                            </div>
                        })
                    )}

                </div>
                <div className="mx-16 mt-8">
                    <h2 className="text-2xl"> <strong>Order Summary </strong>  </h2>
                    <div className="flex">
                        <p> Item : </p>
                        <p>{totalPrice} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart