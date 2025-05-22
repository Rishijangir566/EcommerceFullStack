import { useContext, useEffect, useState } from "react";
import { ecomcontext } from "../context/EcomContext";
// import { Link } from "react-router-dom";
// import { MdCurrencyRupee } from "react-icons/md";
import Loader from "../Components/Loader";

function WishList() {
  const { wishlist, fetchWishlist, removeFromWishlist ,addToCart} =
    useContext(ecomcontext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadWishlist() {
      setLoading(true);
      await fetchWishlist();
      setLoading(false);
    }
    loadWishlist();
  }, []);
  // console.log(wishlist);

  async function handleRemove(productSlug) {
    setLoading(true);
    await removeFromWishlist(productSlug);
    await fetchWishlist();
    setLoading(false);
  }

  async function handleAddToCart(productSlug) {
    setLoading(true);
    await addToCart(productSlug);
    await fetchWishlist();
    setLoading(false);
  }
  
  if (loading) return <Loader />;
  return (
    <>
     <div className="my-24 px-6 grid gap-6">
  {wishlist &&
    wishlist.map((item) => (
      <div
        key={item?.product?._id}
        className="flex flex-col md:flex-row gap-6 p-5 bg-white rounded-xl shadow-lg border hover:shadow-xl transition duration-300"
      >
        {/* Image */}
        <img
          src={item?.product?.image}
          alt={item?.product?.title}
          className="w-full md:w-[160px] h-[160px] object-contain rounded-md bg-gray-50"
        />

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {item?.product?.brand}
            </h2>
            <p className="text-gray-700 text-base">
              {item?.product?.title}
            </p>

            <p className="text-gray-600 text-sm line-clamp-2">
              {item?.product?.description}
            </p>

            <div className="flex items-center gap-2 text-lg font-bold text-blue-700">
              ₹{item?.product?.discountPrice}
              <s className="text-sm text-red-500 font-normal">
                ₹{item?.product?.usualPrice}
              </s>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => handleRemove(item.product.slug)}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200 text-sm"
            >
              Remove
            </button>
            <button
            onClick={() => handleAddToCart(item.product.slug)}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200 text-sm"
            >
              Move to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
</div>
    </>
  );
}

export default WishList;
