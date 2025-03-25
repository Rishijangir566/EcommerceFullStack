import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ecomcontext } from "../context/EcomContext";
import { useAuth } from "../context/AuthProvider";

function SingleProduct() {
  const { id } = useParams();

  const { fetchSingleProducts, fetchCategory,addToWishlist } = useContext(ecomcontext);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const {isUserLoggedIn}=useAuth()

  useEffect(() => {
    if (id) initial();
  }, [id]);

  useEffect(() => {
    setCategoryName(
      categories.find((category) => category._id === product.category)
    );
  }, [product, categories]);

  console.log(categoryName);

  async function initial() {
    const product = await fetchSingleProducts(id);
    const categories = await fetchCategory();

    // console.log(product, categories);
    setProduct(product);
    setCategories(categories);
  }

  //   console.log(product, categories);


  function handleAddToWishlist() {
    isUserLoggedIn
      ? addToWishlist(product.slug)
      : (window.location.href =
          "/user/login?referer=/product/" + product.slug);
  }

  return (
    <>
    <div className="singleProduct flex  mt-[5rem] ">
      <div className="left w-[20%] ml-10">
        <img className="h-[15rem]" src={product.image} alt="" />
      </div>
      <div className="right w-[60%]">
        <h2> <strong>Name : </strong>{product.title}</h2>
        <h2> <strong>Brand : </strong>{product.brand}</h2>
        <h2> <strong>Category : </strong>{categoryName?.name}</h2>
        <h2> <strong>Price : </strong>{product.usualPrice}</h2>
        <h2> <strong>Description : </strong>{product.description}</h2>
        <div className="btn flex mt-4">
        <button className="rounded px-2 py-1 bg-blue-400 text-white mr-4">Add To Cart </button>
        <Link
          onClick={handleAddToWishlist}
          className={handleAddToWishlist?"rounded px-2 py-1 bg-blue-400 text-white":"rounded px-2 py-1 bg-green-400 text-white"}
        >
          Add to Wishlist
        </Link>

        </div>
      </div>
      </div>
    </>
  );
}

export default SingleProduct;
