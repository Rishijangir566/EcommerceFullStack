/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import instance from "../axiosConfig";
// import { useParams } from "react-router-dom";

export const ecomcontext = createContext();
function EcomContext({ children }) {
  const [loading, setLoading] = useState(true);
  // const [wishlist, setWishlist] = useState([]);
  // const [cart, setCart] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);

  async function fetchProducts(page = null) {
    try {
      setLoading(true);
      // const response = await instance.get("/product")
      const response = await instance.get(
        page ? `/product/get?page=${page}` : `product/get`,
        { withCredentials: true }
      );
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
      const response = await instance.get("/product/category");
      // console.log(response.data)
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
    try {
      const response = await instance.post(
        "/cart/add",
        { product: product._id, quantity: 1 },
        { withCredentials: true }
      );
      console.log("cart update", response.data);
    } catch (error) {
      console.log("product not added to cart", error);
    }
  }

  // async function updateQuantity(productId, sign) {
  //   if (!existsInCart(productId)) {
  //     console.log("Incorrect Id");
  //   }

  //   setCart(
  //     cart.map((cartItem) =>
  //       cartItem.product._id === productId
  //         ? {
  //             ...cartItem,
  //             quantity: cartItem.quantity + (sign === "+" ? 1 : -1),
  //           }
  //         : cartItem
  //     )
  //   );
  // }
  // console.log(cart)

  // function removeFromCart(productId) {
  //   setCart(cart.filter((cartItem) => cartItem.product._id !== productId));
  // }

  // function existsInCart(productId) {
  //   const productAlreadyExists = cart.find(
  //     (cartItem) => cartItem.product._id === productId
  //   );
  //   return productAlreadyExists ? true : false;
  // }

  async function fetchHotDeals() {
    try {
      const response = await instance.get("/deals", { withCredentials: true });
      setDealProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWishlist(){
    try{
      const response = await instance.get("/user/getwishlist",{withCredentials:true}) 
      console.log(response.data.wishlist)
      return response.data.wishlist
    }catch(error){
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
        console.log(response);
        if (response.status === 200) {
          return response.data.user.wishlist;
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function existInWishlist(slug) {
    const response = await instance.get(
      `/user/checkInWishlist/${slug},{withCredentials:true}`
    );
    return response.data.exists ? true : false;
  }

  // function to remove item from wishlist.
  // function removeFromWishlist(id) {
  //   setWishlist(wishlist.filter((item) => item.product._id !== id));
  // }

  return (
    <ecomcontext.Provider
      value={{
        loading,
        dealProducts,
        fetchWishlist,
        fetchSingleProducts,
        // updateQuantity,
        addToCart,
        // removeFromCart,
        // existsInCart,
        fetchProducts,
        fetchCategory,
        filterByCategory,
        fetchHotDeals,
        handleDelete,
        existInWishlist,
        // removeFromWishlist,
        addToWishlist,
      }}
    >
      {children}
    </ecomcontext.Provider>
  );
}

export default EcomContext;
