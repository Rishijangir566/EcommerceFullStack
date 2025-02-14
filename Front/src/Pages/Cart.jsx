import { useContext } from "react"
import { ecomcontext } from "../context/EcomContext"
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function Cart() {
    const { cart } = useContext(ecomcontext)
    console.log(cart);

    return (
        <>
        <div className="flex ">

       
            <div className=" w-[60rem]  m-4">

                {cart.length ===0?(
                    <div> 
                        <h2> Nothing to show <Link to="/" className="text-blue-700 underline"> Home Page</Link></h2>
                        
                    </div>
                ):(
                    cart.map((item) => {
                        return <div key={item.product._id} className="flex   border">
                            <img className="w-[20rem] h-[20rem] object-contain p-4" src={item.product.url} />
                            <div>
                                <h2 className="mt-12"> <strong>Name :- </strong> {item.product.name}</h2>
                                <p className="my-2">  <strong> Rating  :- </strong> {item.product.totalRating}</p>
                                <h2 className="my-2"> <strong>Price  :- </strong> {item.product.price}</h2>
                                <h2 className="my-2"> <strong>Brand  :- </strong> {item.product.brand}</h2>
                                <h2 className="my-2"> <strong>Description  :- </strong> {item.product.description}</h2>
                            </div>
                        </div>
                    })
               ) }

            </div>
               <div className="mx-16 mt-8">
                <h2 className="text-2xl"> <strong>Total : </strong>  </h2>
               </div>
               </div>
        </>
    )
}

export default Cart