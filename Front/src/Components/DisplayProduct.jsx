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
                        return <div key={item._id} className=" mx-8 w-[12rem] h-[20rem] ">
                            <Link to={`/product/${item._id}`}> <img className="object-contain w-[12rem] h-[12rem]  " src={item.image} /> </Link>
                        
                            <h2 className="mt-4 font-medium  ">
                                <span className=' font-bold w-[8rem]'> {item.brand + " :"} </span>
                                {item.title} </h2>
                                {/* .split(" ").slice(0, 3).join(" ") + "..."  */}
                            {/* <p className=" my-1"><span className='text-red-700 font-bold' > Discounted Price :</span> $ {item.discountPrice}</p> */}
                        <p className=" my-1 font-bold  ">  Price : $  {item.discountPrice+"  "}<s><span className='font-light text-red-500 text-sm'> {item.usualPrice} </span></s>  </p>
                            <Link to={`/product/${item._id} `}><button className="py-1 w-[12rem] border rounded" >Add To Cart</button></Link>
   
                        </div>
                    })
                ) : ""
            }
        </div>
    )
}

export default DisplayProduct