import { createContext, useState } from "react"
import instance from "../axiosConfig"

export const ecomcontext = createContext();
function EcomContext({ children }) {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    async function fetchProducts() {
        try {
            setLoading(true)
            const response = await instance.get("/product")
            console.log(response.data);
            setProducts(response.data)
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    function addToCart(product) {


        if (existsInCart(product._id)) {
            setCart(
                cart.map((cartItem) =>
                    cartItem._id === product._id ? { ...cartItem, quantity: Number(cartItem.quantity) + 1 } : cartItem
                ))
            }
            else {
                const obj = { product, quantity: 1 }
                setCart([...cart, obj])
            }
        }
        
        
      function updateQuantity(productId ,sign){
      
        if(!existsInCart(productId)){
            console.log("Incorrect Id");
            
        }

        setCart(
            cart.map((cartItem)=> cartItem.product._id===productId?
            {...cartItem, quantity:cartItem.quantity+(sign==="+"?1:-1)
                }:cartItem
            )
        )
      }
      console.log(cart)


        function removeFromCart(productId) {
            setCart(cart.filter((cartItem) => cartItem.product._id !== productId))
        }
        
        function existsInCart(productId){
        const productAlreadyExists = cart.find(
            (cartItem) =>  cartItem.product._id === productId )
            return productAlreadyExists ?true:false
  }


    return (
        <ecomcontext.Provider value={{ loading, products, cart,updateQuantity, addToCart, removeFromCart,existsInCart, fetchProducts }}>
            {children}
        </ecomcontext.Provider>
    )
}

export default EcomContext