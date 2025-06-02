import { useContext, useEffect, useState } from "react";
import { ecomcontext } from "../context/EcomContext";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import instance from "../axiosConfig";
// import Loader from "../Components/Loader";
function Cart() {
  const { fetchCart, updateQuantity, removeFromCart } = useContext(ecomcontext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  async function handleCoupon() {
    try {
      const response = await instance.post("/coupon/verify", {
        code: coupon,
      });

      setCouponMessage(response.data.message || "Coupon applied! 10% off");
      setIsCouponApplied(true);
    } catch (error) {
      setCouponMessage(error.response?.data?.message || "Invalid coupon");
      setIsCouponApplied(false);
    }
  }

  async function fetchData() {
    const newCart = await fetchCart();
    setCart(newCart);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function removeProductFromCart(productId) {
    removeFromCart(productId);
  }

  function updateQuantityCart(productId, action) {
    updateQuantity(productId, action);
  }

  useEffect(() => {
    if (cart) {
      setTotalPrice(
        cart.reduce((acc, cur) => acc + cur.product.discountPrice * cur.quantity, 0)
      );
    }
  }, [cart]);

  const deliveryPrice = 40;
  const discountedPrice = isCouponApplied ? totalPrice * 0.9 : totalPrice;

  // Reset coupon (optional)
  function resetCoupon() {
    setIsCouponApplied(false);
    setCoupon("");
    setCouponMessage("");
  }

  return (
    <>
      <div className="flex mt-20">
        {/* Cart Items */}
        <div className=" w-[80%] flex-wrap flex  m-4">
          {cart.length === 0 ? (
            <div>
              <h2>
                Nothing to show
                <Link to="/" className="text-blue-700 underline">
                  Home Page
                </Link>
              </h2>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product._id}
                className="flex w-[45%] h-[13rem] m-4 border rounded-lg "
              >
                <img
                  className="w-[10rem] h-[13rem] object-contain p-4"
                  src={item.product.image}
                />
                <div className="mx-4 ">
                  <h2 className="mt-4">
                    <strong>Name :- </strong> {item.product.title}
                  </h2>
                  <p className="my-2">
                    <strong> DiscountPrice :- </strong> {item.product.discountPrice}
                  </p>
                  <h2 className="my-2">
                    <strong>Price :- </strong> {item.product.usualPrice}
                  </h2>
                  <h2 className="my-2">
                    <strong>Brand :- </strong> {item.product.brand}
                  </h2>
                  <div className="quantityChanger flex mt-2">
                    {item.quantity === 1 ? (
                      <p
                        className="cursor-pointer w-5 rounded-sm bg-blue-900 flex items-center justify-center"
                        onClick={() => removeProductFromCart(item.product._id)}
                      >
                        <MdDeleteForever className="text-white" />
                      </p>
                    ) : (
                      <p
                        className="cursor-pointer w-5 rounded-sm bg-blue-900 text-white flex items-center justify-center"
                        onClick={() => updateQuantityCart(item.product._id, "-")}
                      >
                        -
                      </p>
                    )}
                    <p className="cursor-pointer w-10 border border-gray-300 mx-2 bg-gray-100 flex items-center justify-center">
                      {item.quantity}
                    </p>
                    <p
                      className="cursor-pointer w-5 bg-blue-900 rounded-sm text-white flex items-center justify-center"
                      onClick={() => updateQuantityCart(item.product._id, "+")}
                    >
                      +
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="mx-16 mt-8 bg-gray-300 h-[32rem] rounded-2xl pt-3 text-center w-[40%]">
          <h2 className="text-3xl text-blue-800">
            <strong>ORDER SUMMARY </strong>
          </h2>
          <div className="flex gap-2 mt-8 ml-14 text-xl">
            <h2>
              <strong> Order Price : </strong>
            </h2>
            <p>{totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 ml-14 mt-3 text-lg">
            <h2>
              <strong> Delivery Price : </strong>
            </h2>
            <p>{deliveryPrice.toFixed(2)}</p>
          </div>
          <div className="flex flex-col ml-14 mt-3 text-lg">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border rounded-xl px-2 font-bold w-[9rem]"
                disabled={isCouponApplied} // disable after apply
              />
              <button
                className="bg-red-600 text-white px-3 rounded-xl"
                onClick={handleCoupon}
                disabled={isCouponApplied} // disable after apply
              >
                Apply
              </button>
              {isCouponApplied && (
                <button
                  className="bg-gray-600 text-white px-2 rounded-xl ml-2"
                  onClick={resetCoupon}
                >
                  Remove
                </button>
              )}
            </div>
            {couponMessage && (
              <p
                className={`text-sm mt-2 ${
                  isCouponApplied ? "text-green-600" : "text-red-600"
                }`}
              >
                {couponMessage}
              </p>
            )}
          </div>
          <div className="flex gap-2 ml-14 my-8 text-red-600 text-2xl">
            <h2>
              <strong> Total Price : </strong>
            </h2>
            <p className="text-black font-bold">
              {(discountedPrice + deliveryPrice).toFixed(2)}
            </p>
          </div>

          <button className="rounded-2xl font-bold text-2xl bg-green-400 px-4 py-1">
            Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart