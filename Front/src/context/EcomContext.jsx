/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import instance from "../axiosConfig";
// import { useParams } from "react-router-dom";

export const ecomcontext = createContext();
function EcomContext({ children }) {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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

  async function filterByCategory(categoryName, isName) {
    try {
      setLoading(true);
      // const response = await instance.get(`/product/?category=${category}`)
      const url = isName
        ? "/product/get/?categoryName="
        : "/product/get/?category=";

      const response = await instance.get(url + categoryName);
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

  async function addToCart(product, quantity = 1) {
    try {
      const response = await instance.post(
        `/cart/add`,
        { productSlug: product, quantity },
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
              setCart(response.data.updateCart.items)
            }else{
              console.log("error ");
              
            }
    } catch (error) {
      console.log(error, "cart error");
    }
  }
  // console.log("cartt", cart);

  async function fetchCart() {
    try {
      const response = await instance.get("/cart/fetchCart", {
        withCredentials: true,
      });
      return response.data.items;
    } catch (error) {
      console.log(error);
    }
  }

 

  async function updateQuantity(productId, action) {
    try {
      const response = await instance.put(
        `/cart/updateQuantity`,{productId, operation: action},
        { withCredentials: true }
      );
      console.log(response.data.items);
      setCart(response.data.items)
    } catch (error) {
      console.log("error", error);
    }
  }



  async function removeFromCart(productId) {
    try {
      const response = await instance.delete(
        `/cart/removeProduct/${productId}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setCart(response.data.items);
     
    } catch (error) {
      console.log("error", error);
    }
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
      // console.log(wishlistData);

      const populatedWishlist = await Promise.all(
        wishlistData.map(async (productSlug) => {
          const productResponse = await instance.get(
            `/product/get/${productSlug}`,
            { withCredentials: true }
          );
          return { product: productResponse.data.products[0] };
        })
      );
      // console.log(populatedWishlist);
      setWishlist(populatedWishlist);
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
          setWishlist([...wishlist, response.data.wishlist]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(productSlug) {
    try {
      // console.log(productSlug);

      const response = await instance.delete(
        `/user/deleteWishlist/${productSlug}`,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function existInWishlist(slug) {
    const response = await instance.get(`/user/checkInWishlist/${slug}`, {
      withCredentials: true,
    });
    return response.data.exists ? true : false;
  }

  function clearWishlist(){
    setWishlist([])
  }

  return (
    <ecomcontext.Provider
      value={{
        loading,
        dealProducts,
        cart,
        wishlist,
        removeFromWishlist,
        fetchSingleProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        fetchProducts,
        fetchCategory,
        filterByCategory,
        fetchHotDeals,
        handleDelete,
        existInWishlist,
        fetchWishlist,
        addToWishlist,
        clearWishlist
      }}
    >
      {children}
    </ecomcontext.Provider>
  );
}

export default EcomContext;
