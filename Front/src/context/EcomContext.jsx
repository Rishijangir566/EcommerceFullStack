/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
import instance from "../axiosConfig"
// import { useParams } from "react-router-dom";

export const ecomcontext = createContext();
function EcomContext({ children }) {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [productByCat, setProductByCat] = useState([])
    // const [wishlist, setWishList] = useState([])
    const [cart, setCart] = useState([])
    const [dealProducts, setDealProducts] = useState([])

    async function fetchProducts() {
        try {
            setLoading(true)
            // const response = await instance.get("/product")
            const response = await instance.get("/product/get", { withCredentials: true })
            // console.log(response.data);
            setProducts(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    async function filterByCategory(category) {

        try {
            setLoading(true)
            // const response = await instance.get(`/product/?category=${category}`)
            const response = await instance.get(`/product/get/?category=${category}`)
            console.log(response.data);
            setProductByCat(response.data)
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
            // console.log(response.data);
            setCategories(response.data)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }




    async function addToCart(product) {

        try {
            const response = await instance.post("/cart/add", { product: product._id, quantity: 1 }, { withCredentials: true })
            console.log("cart update", response.data);

        } catch (error) {
            console.log("product not added to cart", error);

        }

        // if (existsInCart(product._id)) {
        //     setCart(
        //         cart.map((cartItem) =>
        //             cartItem._id === product._id ? { ...cartItem, quantity: Number(cartItem.quantity) + 1 } : cartItem
        //         ))

        // }
        // else {
        //     const obj = { product, quantity: 1 }
        //     setCart([...cart, obj])
        // }
    }


    function updateQuantity(productId, sign) {

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


    return (
        <ecomcontext.Provider value={{
            loading,
            products,
            cart,
            categories,
            productByCat,
            dealProducts,
            updateQuantity,
            addToCart,
            removeFromCart,
            existsInCart,
            fetchProducts,
            fetchCategory,
            filterByCategory,
            fetchHotDeals
        }}>

            {children}
        </ecomcontext.Provider>
    )
}

export default EcomContext