/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from 'react-router-dom'

function DisplayProduct({ product }) {
    console.log(product);
    
    return (

        <div className="flex justify-evenly gap-12 flex-wrap my-12 ">

            {
                product.length > 0 ? (
                    product.map((item) => {
                        return <div key={item._id} className="text-center mx-8">
                            <Link to={`/product/${item._id}`}> <img className="w-[12rem] h-[12rem] object-contain " src={item.image} /> </Link>

                            <h2 className="mt-4  ">
                                <span className='px-2 font-bold'> {item.brand + " :"} </span>
                                {item.title} </h2>
                                {/* .split(" ").slice(0, 3).join(" ") + "..."  */}
                            <p className=" my-2"><span className='text-blue-700 font-bold'> Original Price :</span> $ {item.usualPrice}</p>
                            <p className=" my-2"><span className='text-red-700 font-bold' > Discounted Price :</span> $ {item.discountPrice}</p>
                            <Link to={`/product/${item._id}`}><button className="py-1 px-4 border rounded" >Add To Cart</button></Link>

                        </div>
                    })
                ) : ""
            }
        </div>
    )
}

export default DisplayProduct