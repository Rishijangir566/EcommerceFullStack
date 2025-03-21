import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ecomcontext } from "../context/EcomContext"


function SingleProduct() {

    const { id } = useParams()
    const { fetchSingleProducts, singleProduct, categories , filterByCategory,productByCat } = useContext(ecomcontext)
    const [categoryName, setCategoryName] = useState("")
    const [similarProduct, setSimilarProduct] = useState([])

    console.log(categories)
    useEffect(() => {
        fetchSingleProducts(id)
    }, [])
    
    useEffect(() => {
        setCategoryName(categories?.find((obj) => obj._id === singleProduct.category)?.name)
        filterByCategory(singleProduct.category)
        
    }, [singleProduct, categories])
    
    useEffect(() => {
        fetchSimilarProduct()
    }, [singleProduct,productByCat])


   function fetchSimilarProduct(){
    setSimilarProduct(productByCat.filter((item)=>item._id!==singleProduct._id))
   }
   
    return (
        <>
            {singleProduct && (
                <>
                
                <div className="flex my-20 px-4">
                    <div className="left w-[22rem] h-[15rem] ">
                        <img src={singleProduct.image} className=" w-[20rem] h-[15rem]" alt={singleProduct.title} />
                    </div>
                    <div className="right w-[50rem]">
                        <h2 className="my-1"> <strong>Name : </strong>{singleProduct.title}</h2>
                        <p className="my-1"><strong>Brand : </strong>{singleProduct.brand} </p>
                        <p className="my-1"><strong>Original price : </strong>{singleProduct.usualPrice} </p>
                        <p className="my-1"><strong>Discounted Price : </strong>{singleProduct.discountPrice} </p>
                        <p className="my-1"><strong>Category : </strong>{categoryName} </p>
                        <p className="my-1"><strong>Description : </strong> {singleProduct.description} </p>
                        <button className="bg-blue-700 px-4 py-1 mr-2 rounded text-white font-medium mt-4">Add To Cart</button>
                        <button className="bg-blue-700 px-4 py-1 mr-2 rounded text-white font-medium mt-4">Add To WishList</button>
                    </div>
                </div>


                <div>
                    <h2 className="text-center bg-amber-600">SIMILAR PRODUCTS </h2>
                    <div className="flex flex-wrap justify-center gap-8 ">

                    {  
                      similarProduct.map((item)=>{
                          return (
                              <div key={item._id} className="w-[15rem] h-[12rem] my-4">
                                    <img className="w-[12rem] h-[10rem]" src={item.image} />
                                    <p> <strong>Item :</strong>{item.title}</p>
                                    <p> <strong>Price :</strong>{item.usualPrice}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                </>
            )}
        </>
    )
}

export default SingleProduct