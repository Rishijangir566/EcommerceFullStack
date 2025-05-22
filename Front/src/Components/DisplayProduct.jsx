/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
// import { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";

function DisplayProduct({ product }) {
 
  return (
  <div className="flex justify-center flex-wrap gap-8 my-20  ">
  {product?.products?.length > 0 &&
    product.products.map((item) => (
      <div
        key={item._id}
        className="w-[14rem] bg-gray-100 rounded shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200"
      >
        <Link
          to={item.slug ? `/product/${item.slug}` : `/product/${item._id}`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="object-contain w-full h-[10rem] p-3 bg-gray-100"
          />
        </Link>

        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-700 truncate">
            Brand: <span className="text-gray-900">{item.brand}</span>
          </h3>

          <h2 className="text-sm text-gray-600 mt-1 truncate">
            Name:{" "}
            <span className="font-medium">
              {item.title.split(" ").slice(0, 2).join(" ") + "..."}
            </span>
          </h2>

          <p className="mt-2 text-base font-bold text-green-700">
            ${item.discountPrice}
            <s className="ml-2 text-sm font-normal text-red-500">
              ${item.usualPrice}
            </s>
          </p>

          <Link
            to={item.slug ? `/product/${item.slug}` : `/product/${item._id}`}
          >
            <button className="mt-4 w-full py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-md transition">
              Add To Wishlist
            </button>
          </Link>
        </div>
      </div>
    ))}
</div>

  );
}

export default DisplayProduct;
