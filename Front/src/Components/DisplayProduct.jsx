/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from 'react-router-dom'

function DisplayProduct({ product }) {
    return (

        <div className="flex justify-evenly gap-12 flex-wrap my-12 ">

            {
                product.length > 0 ? (
                    product.map((item) => {
                        return <div key={item._id} className="text-center ">
                            <Link to={`/product/${item._id}`}> <img className="w-[12rem] h-[12rem] object-contain " src={item.image} /> </Link>

                            <h2 className="mt-4 font-bold ">
                                <span className='px-2 font-bold'> {item.brand} </span>
                                {item.title.split(" ").slice(0, 3).join(" ") + "..."}</h2>
                            <p className="text-blue-700 my-2"><span> Original Price :</span> $ {item.usualPrice}</p>
                            <p className="text-blue-700 my-2"><span> Discounted Price :</span> $ {item.discountPrice}</p>
                            <Link to={`/product/${item._id}`}><button className="py-1 px-4 border rounded" >Add To Cart</button></Link>

                        </div>
                    })
                ) : ""
            }
        </div>
    )
}

export default DisplayProduct