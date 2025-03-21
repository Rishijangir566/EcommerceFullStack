/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
import instance from "../axiosConfig"
// import { useParams } from "react-router-dom";

export const ecomcontext = createContext();
function EcomContext({ children }) {

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [singleProduct, setSingleProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [productByCat, setProductByCat] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [cart, setCart] = useState([])
    const [dealProducts, setDealProducts] = useState([])


    async function fetchProducts(page = null) {
        try {
            setLoading(true)
            // const response = await instance.get("/product")
            const response = await instance.get(page ? `/product/get?page=${page}` : `product/get`, { withCredentials: true })
            setProduct(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    async function fetchAllProducts() {
        try {
            setLoading(true)
            // const response = await instance.get("/product")
            const response = await instance.get("product/get?limit=-1", { withCredentials: true })
            setProduct(response.data.products)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    async function fetchSingleProducts(id) {
        try {
            const response = await instance.get(`product/get/${id}`)
            setSingleProduct(response.data.products[0])
        } catch (error) {
            console.log(error);
        }
    }




    async function filterByCategory(category) {

        try {
            setLoading(true)
            // const response = await instance.get(`/product/?category=${category}`)
            const response = await instance.get(`/product/get/?category=${category}`)
            // console.log(response.data.products);
            setProductByCat(response.data.products)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }

    }


    async function fetchCategory() {
        try {
            setLoading(true)
            // const response = await instance.get("/product/categories/all")
            const response = await instance.get("/product/category")
            // console.log(response.data)
            setCategories(response.data)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    // console.log(categories);


    async function handleDelete(idToDelete, whatTodelete) {
        try {
            const response = await instance.delete(`/product/${idToDelete}`)
            if (response.status === 200) {
                window.location.href = whatTodelete === "product" ? "/admin/products" : "/admin/categories"
            }
        } catch (error) {
            console.log(error);
        }
    }



    async function addToCart(product) {

        try {
            const response = await instance.post("/cart/add", { product: product._id, quantity: 1 }, { withCredentials: true })
            console.log("cart update", response.data);

        } catch (error) {
            console.log("product not added to cart", error);

        }

       
    }


    async function updateQuantity(productId, sign) {

        if (!existsInCart(productId)) {
            console.log("Incorrect Id");

        }
       

        setCart(
            cart.map((cartItem) => cartItem.product._id === productId ?
                {
                    ...cartItem, quantity: cartItem.quantity + (sign === "+" ? 1 : -1)
                } : cartItem
            )
        )
    }
    // console.log(cart)


    function removeFromCart(productId) {
        setCart(cart.filter((cartItem) => cartItem.product._id !== productId))
    }

    function existsInCart(productId) {
        const productAlreadyExists = cart.find(
            (cartItem) => cartItem.product._id === productId)
        return productAlreadyExists ? true : false
    }

    async function fetchHotDeals() {
        try {
            const response = await instance.get("/deals", { withCredentials: true })
            setDealProducts(response.data)
        } catch (error) {
            console.log(error);

        }
    }
    function addToWishlist(product) {
        if (existInWishlist(product._id)) {
            alert("Already exist in wishlist");
        } else {
            const obj = { product };
            setWishlist([...wishlist, obj]);
        }
    }
    function existInWishlist(id) {
        const productAlreadyExists = wishlist.find(
            (wishlistItem) => wishlistItem.product._id === id
        );
        return productAlreadyExists ? true : false;
    }

    // function to remove item from wishlist.
    function removeFromWishlist(id) {
        setWishlist(wishlist.filter((item) => item.product._id !== id));
    }


    return (
        <ecomcontext.Provider value={{
            loading,
            product,
            cart,
            categories,
            productByCat,
            dealProducts,
            wishlist,
            singleProduct,
            fetchSingleProducts,
            updateQuantity,
            addToCart,
            removeFromCart,
            existsInCart,
            fetchProducts,
            fetchCategory,
            filterByCategory,
            fetchHotDeals,
            handleDelete,
            fetchAllProducts,
            existInWishlist,
            removeFromWishlist,
            addToWishlist,

        }}>

            {children}
        </ecomcontext.Provider>
    )
}

export default EcomContext