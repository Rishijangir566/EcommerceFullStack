import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ecomcontext } from "../context/EcomContext";
import { useAuth } from "../context/AuthProvider";
import Loader from "../Components/Loader";

function SingleProduct() {
  const { id } = useParams();

  const { fetchSingleProducts, fetchCategory,addToWishlist } = useContext(ecomcontext);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const {isUserLoggedIn}=useAuth()

  useEffect(() => {
    if (id) initial();
  }, [id]);

  async function initial() {
    setLoading(true);
    const product = await fetchSingleProducts(id);
    const categories = await fetchCategory();

    // console.log(product, categories);
    setProduct(product);
    setCategories(categories);
    setLoading(false);
  }
  //   console.log(product, categories);


  useEffect(() => {
    setCategoryName(
      categories.find((category) => category._id === product.category)
    );
  }, [product, categories]);

  // console.log(categoryName);




  function handleAddToWishlist() {
    isUserLoggedIn
      ? addToWishlist(product.slug)
      : (window.location.href =
          "/user/login?referer=/product/" + product.slug);
  }

  function handleAddToCart() {}
 
   if (loading) return <Loader />;

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
        <div className="flex gap-3 py-2">
                 <Link
                   className="rounded px-2 py-1 bg-blue-400 text-white"
                   onClick={handleAddToCart}
                 >
                   Add To Cart
                 </Link>
                 <Link
                   className="rounded px-2 py-1 bg-green-400 text-white"
                   onClick={handleAddToWishlist}
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
