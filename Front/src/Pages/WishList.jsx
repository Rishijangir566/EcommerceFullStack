import { useContext, useEffect, useState } from 'react'
import { ecomcontext } from '../context/EcomContext';

function WishList() {

    const { fetchWishlist } = useContext(ecomcontext); // this useEcom is nothing but say useContext(ecomContext).
   const [wishlist, setWishlist] = useState([]);
 
   async function Fetch() {
     const data = await fetchWishlist();
     setWishlist(data);
   }
   useEffect(() => {
     Fetch();
   }, []);


  return (
    <div>
        {wishlist &&
         wishlist.map((item) => {
           return (
             <div key={item._id} className='flex items-center gap-5 border m-5 rounded-2xl py-3'>
 
               <img src={item.image} alt="" className='w-[130px] h-[140px] mx-5'/>
              <div className='flex-col gap-1 text-lg'>  
               <p className='font-bold'>{item.brand}</p>
               <p>{item.title}</p>
               <p>{item.OriginalPrice}</p>
              </div>
             </div>
           );
         })}
    </div>
  )
}

export default WishList