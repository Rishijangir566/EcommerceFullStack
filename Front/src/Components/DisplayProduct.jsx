/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
// import { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";

function DisplayProduct({ product }) {
 
  return (
    <div className="flex justify-around  gap-8 flex-wrap my-20   ">
      {product?.products?.length > 0
        ? product?.products?.map((item) => {
            return (
              <div
                key={item._id}
                className=" w-[18rem] h-[22rem] shadow shadow-black "
              >
                <Link
                  to={
                    item.slug ? `/product/${item.slug}` : `/product/${item._id}`
                  }
                >
                  {" "}
                  <img
                    className="object-contain w-[18rem] h-[14rem] p-4  "
                    src={item.image}
                  />{" "}
                </Link>

                <h2 className="mt-4 font-medium ml-8">
                  <span className=" font-bold w-[17rem]">
                    {" "}
                    {item.brand + " :"}{" "}
                  </span>
                  {item.title.split(" ").slice(0, 2).join(" ") + "..."}{" "}
                </h2>
                {/* .split(" ").slice(0, 3).join(" ") + "..."  */}
                {/* <p className=" my-1"><span className='text-red-700 font-bold' > Discounted Price :</span> $ {item.discountPrice}</p> */}
                <p className=" my-1 font-bold ml-8 ">
                  
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
                  
                  <button className="py-1 w-[18rem] bg-blue-900 mt-4 text-white">
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

export default DisplayProduct;
