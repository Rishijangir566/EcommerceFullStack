/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { ecomcontext } from "../context/EcomContext"
import { useContext, useEffect } from "react"
import Loader from "../Components/Loader"
import DisplayProduct from "../Components/DisplayProduct"

function ShopByCategory() {

    const { categoryId } = useParams()

    const { filterByCategory, productByCat, loading } = useContext(ecomcontext)

    useEffect(() => {
        if (categoryId) {
            filterByCategory(categoryId)
        }
    }, [categoryId])
    return loading ? <Loader /> : <DisplayProduct product={productByCat} />
}

export default ShopByCategory