import { useContext, useEffect } from "react";
import { ecomcontext } from "../context/EcomContext";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function DisplayHotDeals() {
  const { fetchHotDeals, dealProducts, loading } = useContext(ecomcontext);
  useEffect(() => {
    fetchHotDeals();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-center  gap-20 flex-wrap py-20 bg-purple-400    ">
      {dealProducts.length > 0
        ? dealProducts.map((item) => {
            return (
              <div
                key={item._id}
                className=" w-[14rem] h-[18rem] shadow shadow-black  bg-white"
              >
                <Link
                  to={
                    item.slug ? `/product/${item.slug}` : `/product/${item._id}`
                  }
                >
                  <img
                    className="object-contain w-[13rem] h-[10rem] p-4  "
                    src={item.image}
                  />
                </Link>

                <h2 className="mt-2 font-medium ml-2 ">
                  <span className=" font-bold w-[17rem]">
                    Brand:
                    {item.brand}
                  </span>
                </h2>
                <h2 className=" font-medium ml-2 ">
                  Name :
                  <span>
                    {item.title.split(" ").slice(0, 2).join(" ") + "..."}
                  </span>
                </h2>
                {/* .split(" ").slice(0, 3).join(" ") + "..."  */}
                {/* <p className=" my-1"><span className='text-red-700 font-bold' > Discounted Price :</span> $ {item.discountPrice}</p> */}
                <p className=" my-1 font-bold ml-2 ">
                  Price : $ {item.discountPrice + "  "}
                  <s>
                    <span className="font-light text-red-500 text-sm">
                      {item.usualPrice}
                    </span>
                  </s>
                </p>

   

                <Link
                  to={
                    item.slug ? `/product/${item.slug}` : `/product/${item._id}`
                  }
                >
                  <button className="py-1 w-[14rem] bg-blue-900  text-white">
                    Add To Wishlist
                  </button>
                </Link>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default DisplayHotDeals;
