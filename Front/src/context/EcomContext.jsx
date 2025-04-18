/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import instance from "../axiosConfig";
// import { useParams } from "react-router-dom";

export const ecomcontext = createContext();
function EcomContext({ children }) {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      // const response = await instance.get("/product")
      const response = await instance.get(`product/get`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSingleProducts(id) {
    try {
      const response = await instance.get(`product/get/${id}`);
      // console.log(response.data.products[0]);
      return response.data.products[0];
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function filterByCategory(category, isName = false) {
    try {
      setLoading(true);
      // const response = await instance.get(`/product/?category=${category}`)
      const url = isName
        ? "/product/get/?categoryName="
        : "/product/get/?category=";
      const response = await instance.get(url + category);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategory() {
    try {
      setLoading(true);
      // const response = await instance.get("/product/categories/all")
      const response = await instance.get("/product/category", {
        withCredentials: true,
      });
      // console.log("hello"+response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(idToDelete, whatTodelete) {
    try {
      const response = await instance.delete(`/product/${idToDelete}`);
      if (response.status === 200) {
        window.location.href =
          whatTodelete === "product" ? "/admin/products" : "/admin/categories";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart(product) {
    const existingCartItem = cart.find(
      (item) => item.product._id === product._id
    );
    try {
      if (existingCartItem) {
        setCart(
          cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { product, quantity: 1 }]);
      }
    } catch (error) {
      console.log("product not added to cart", error);
    }
  }

  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.product._id !== productId));
  }

  function updateQuantity(productId, action) {
    setCart(
      cart.map((item) =>
        item.product._id === productId
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  }


  async function fetchHotDeals() {
    try {
      const response = await instance.get("/deals", { withCredentials: true });
      setDealProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWishlist() {
    try {
      const response = await instance.get("/user/getwishlist", {
        withCredentials: true,
      });
      const wishlistData = response.data.wishlist;
      console.log(wishlistData);

      const populatedWishlist = await Promise.all(
        wishlistData.map(async (productId) => {
          const productResponse = await instance.get(
            `/product/get/${productId.slug}`
          );
          return { product: productResponse.data.products[0] };
        })
      );
      console.log(populatedWishlist);
      return populatedWishlist;
    } catch (error) {
      console.log(error);
    }
  }

  async function addToWishlist(productSlug) {
    try {
      if (await existInWishlist(productSlug)) {
        alert("Already exist in wishlist");
      } else {
        const response = await instance.post(
          "/user/addToWishlist",
          { productSlug },
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.status === 200) {
          return response.data.user.wishlist;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function existInWishlist(slug) {
    const response = await instance.get(`/user/checkInWishlist/${slug}`, {
      withCredentials: true,
    });
    return response.data.exists ? true : false;
  }

  return (
    <ecomcontext.Provider
      value={{
        loading,
        dealProducts,
        cart,
        fetchWishlist,
        fetchSingleProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchProducts,
        fetchCategory,
        filterByCategory,
        fetchHotDeals,
        handleDelete,
        existInWishlist,
        addToWishlist,
      }}
    >
      {children}
    </ecomcontext.Provider>
  );
}

export default EcomContext;
