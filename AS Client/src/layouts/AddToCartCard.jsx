import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';

function TodoComponent(props) {

  async function deleteFromAddToCart() {
      let productId = props.id
      let productType = props.productType;
      try {
        const response = await axios.delete('http://localhost:8888/addToCart',
        {
          data: { productId, productType },
          withCredentials: true,
        });

        if(response.status == 200){
          productId = '';
          // console.log("Product deleted from cart successfully!");
        }
        else{
          // console.log("fail to delete")
        }
      }catch {
      }
  }

  return (
    <div className='border-2 border-solid border-customGreen w-full min-h-30 my-3 flex flex-col p-3 relative'>
      <div className='flex w-full'>
        <div className='flex-shrink-0'>
          <img src={props.imageURL} alt='Card Image' className='w-24 h-24'/>
        </div>
        <div className='flex flex-col ml-4'>
          <h3 className='text-lg font-bold'>{props.name}</h3>
          <p className='text-lg break-words'>{props.specification}</p>
          <p className='text-sm'>Quantity : {props.quantity}</p>
          <h3 className='font-semibold text-lg'>₹ {props.price}</h3>
        </div>   
      </div>

      {/* Fixed delete icon at the top right */}
      <RiDeleteBinLine 
        size={20} 
        className='text-red-800 cursor-pointer absolute top-2 right-2' 
        onClick={deleteFromAddToCart}
      />
    </div>
  );
}

export default TodoComponent;
