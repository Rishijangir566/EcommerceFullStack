import { useContext, useEffect, useState } from "react";
import { ecomcontext } from "../context/EcomContext";
import { Link } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import Loader from "../Components/Loader";

function WishList() {
  const { wishlist, fetchWishlist, removeFromWishlist } =
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
  
  if (loading) return <Loader />;
  return (
    <>
      <div className="mt-16">
        {wishlist &&
          wishlist.map((item) => {
            return (
              <div
                key={item?.product?._id}
                className="flex items-center gap-5 border m-5 rounded-2xl py-3"
              >
                <img
                  src={item?.product?.image}
                  alt=""
                  className="w-[130px] h-[140px] mx-5"
                />
                <div className="flex flex-col gap-3 text-lg ">
                  <div className="flex gap-2 font-medium">
                    <p className="text-2xl/6">
                      <strong>{item?.product?.brand}</strong>
                    </p>
                    <p>{item?.product?.title}</p>
                  </div>
                  <div className="flex text-lg/4">
                    <MdCurrencyRupee className=" text-blue-600 text-lg" />
                    <span className="text-blue-600 font-bold">
                      {item?.product?.discountPrice}
                    </span>
                  </div>

                  <p className="pr-20">{item?.product?.description}</p>

                  <div className="flex gap-3 py-2">
                    <Link
                      className="rounded px-2 py-1 bg-red-600 text-white"
                      onClick={() => handleRemove(item.product.slug)}
                    >
                      Remove
                    </Link>
                    <Link className="rounded px-2 py-1 bg-green-600 text-white">
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default WishList;
