import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ecomcontext } from "../context/EcomContext";
import { useAuth } from "../context/AuthProvider";
import Loader from "../Components/Loader";

function SingleProduct() {
  const { id } = useParams();

  const {
    fetchSingleProducts,
    fetchCategory,
    addToWishlist,
    addToCart,
    filterByCategory,
  } = useContext(ecomcontext);

  const [product, setProduct] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const { isUserLoggedIn } = useAuth();

  useEffect(() => {
    initial();
  }, [id]);

  async function initial() {
    setLoading(true);

    const product = await fetchSingleProducts(id);
    const categories = await fetchCategory();

    setProduct(product);
    // setCategories(categories);

    if (product?.category) {
      const matchedCategory = categories.find(
        (cat) => cat._id === product.category
      );

      
      if (matchedCategory) {
        setCategoryName(matchedCategory.name);
        
        const similar = await filterByCategory(matchedCategory.name, true);
        console.log(similar);
        const filteredSimilar =
        similar?.products?.filter((p) => p._id !== product._id) || [];
        console.log(filteredSimilar);

        setSimilarProducts(filteredSimilar);
      }
    }

    setLoading(false);
  }



  function handleAddToWishlist() {
    isUserLoggedIn
      ? addToWishlist(product.slug)
      : (window.location.href = "/user/login?referer=/product/" + product.slug);
  }

  function handleAddToCart() {
    isUserLoggedIn
      ? addToCart(product.slug)
      : (window.location.href = "/user/login?referer=/product/" + product.slug);
  }

  if (loading) return <Loader />;

  return (
    <>
      <div className="singleProduct flex  mt-[5rem] ">
        <div className="left w-[20%] ml-10">
          <img className="h-[15rem]" src={product.image} alt="" />
        </div>
        <div className="right w-[60%]">
          <h2>
            <strong>Name : </strong>
            {product.title}
          </h2>
          <h2>
            <strong>Brand : </strong>
            {product.brand}
          </h2>
          <h2>
            <strong>Category : </strong>
            {categoryName}
          </h2>
          <h2>
            <strong>Price : </strong>
            {product.usualPrice}
          </h2>
          <h2>
            <strong>Description : </strong>
            {product.description}
          </h2>
          <div className="flex gap-3 py-2">
            <Link
              className="rounded px-2 py-1 bg-blue-600 text-white "
              onClick={handleAddToCart}
            >
              Add To Cart
            </Link>
            <Link
              className="rounded px-2 py-1 bg-green-600 text-white"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <h2 className=" bg-red-300 text-center uppercase font-bold text-xl">
          Simillar Products
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mt-6 px-4">
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item.slug || item._id}`}
                className="w-[12rem] border p-2 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[8rem] object-contain mx-auto"
                />
                <h3 className="font-semibold text-center mt-2">
                  {item.title.slice(0, 15)}...
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {item.brand}
                </p>
                <p className="text-center font-bold text-blue-800">
                  ${item.discountPrice}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No similar products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
