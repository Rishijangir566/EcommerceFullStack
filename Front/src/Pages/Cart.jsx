import { useContext, useEffect, useState } from "react";
import { ecomcontext } from "../context/EcomContext";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
// import Loader from "../Components/Loader";

function Cart() {
  const { cart ,updateQuantity,removeFromCart } = useContext(ecomcontext);

  const [totalPrice, setTotalPrice] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(0);


  useEffect(() => {
    if (cart) {
      setTotalPrice(
        cart.reduce((acc, cur) => {
          return acc + cur.product.discountPrice * cur.quantity;
        }, 0)
      );
    }
  }, [totalPrice, cart]);

  // if(loading) return <Loader/>

  return (
    <>
      <div className="flex ">
        <div className=" w-[80%] flex-wrap flex  m-4">
          {cart.length === 0 ? (
            <div>
              <h2>
                {" "}
                Nothing to show{" "}
                <Link to="/" className="text-blue-700 underline">
                  {" "}
                  Home Page
                </Link>
              </h2>
            </div>
          ) : (
            cart.map((item) => {
              return (
                <div key={item.product._id} className="flex w-[45%] m-4 border">
                  <img
                    className="w-[10rem] h-[13rem] object-contain p-4"
                    src={item.product.image}
                  />
                  <div className="mx-4 ">
                    <h2 className="mt-4">
                      {" "}
                      <strong>Name :- </strong> {item.product.title}
                    </h2>
                    <p className="my-2">
                      {" "}
                      <strong> DiscountPrice :- </strong>{" "}
                      {item.product.discountPrice}
                    </p>
                    <h2 className="my-2">
                      {" "}
                      <strong>Price :- </strong> {item.product.usualPrice}
                    </h2>
                    <h2 className="my-2">
                      {" "}
                      <strong>Brand :- </strong> {item.product.brand}
                    </h2>
                    {/* <h2 className="my-2"> <strong>Description  :- </strong> {item.product.description}</h2> */}
                    <div className="flex text-2xl">
                      {item.quantity === 1 ? (
                        <p
                          className="bg-yellow-300 px-2  cursor-pointer "
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          {" "}
                          <MdDeleteForever className="pt-2" />
                        </p>
                      ) : (
                        <p
                          className="bg-yellow-300 cursor-pointer px-2 "
                          onClick={() => updateQuantity(item.product._id, "-")}
                        >
                        
                          -{" "}
                        </p>
                      )}
                      <p className="px-8 border  mx-1">{item.quantity}</p>
                      <p
                        className="bg-yellow-300 px-2 cursor-pointer"
                        // onClick={() => updateQuantity(item.product._id, "+")}
                        onClick={() => updateQuantity(item.product)}
                      >
                     
                        +{" "}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="mx-16 mt-8 bg-amber-500 rounded-2xl h-[8rem] pt-3 text-center w-[30%]">
          <h2 className="text-2xl">
            {" "}
            <strong>Order Summary </strong>{" "}
          </h2>
          <div className="flex justify-center m-4 text-2xl">
            <h2>
              <strong>Item : </strong>{" "}
            </h2>
            <p>{totalPrice} </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
