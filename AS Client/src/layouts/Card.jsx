import React, { useState } from 'react'
import Button from "../layouts/Button";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';

const Card = (props) => {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();
  let productId = props.id;
  let productType = props.productType;
  async function handleAddTCart() {
    if (isLoggedIn) {

      const response = await axios.post('http://localhost:8888/addToCart',
        { productId, productType },
        {
          withCredentials: true
        }
      );
      if (response.data) {
        productId = '';
        productType = '';
        setAdded(true);
        setTimeout(() => {
          setAdded(false)
        }, 1000);
      }
    } else {
      setTimeout(() => {
        navigate('/SignUp');
      },);
    }
  }

  async function deleteCard() {
    let productId = props.id
    let productType = props.productType;

    try {
      const response = await axios.delete('http://localhost:8888/deleteProduct',
      {
        data: { productId, productType },
        withCredentials: true,
      });

      if(response.status == 200){
        productId = '';
        productType = '';
        // console.log("Product deleted from cart successfully!");
      }
      else{
        // console.log("fail to delete")
      }
    }catch {
    }
  }

  return (
    <>
      {isAdmin ? (
        <>
        <div className="w-full lg:w-1/1 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg bg-customYellow border-customGreen">
      <div className='flex float-end '>
      <RiDeleteBinLine size={23} className='text-red-800 cursor-pointer mb-2' onClick={deleteCard}/>
      </div>
          <img className="rounded-xl " src={props.imageURL} alt="img" style={{ width: '400px', height: '300px' }} />
          <div className='space-y-4'>
            <h1 className="font-semibold text-center text-xl pt-6">{props.name}</h1>
            <div>
              <h3 className='text-lg'>Specification: {props.specification}</h3>
            </div>
            <div className='flex flex-row items-center justify-center gap-20'>
              <h3 className='font-semibold text-lg'>₹ {props.price}</h3>
              {added ?
                (
                  <>
                    <div className='text-customGreen text-xl '>
                      Product Added !
                    </div>
                  </>
                ) : (
                  <Button title="ADD TO CARD" onClick={handleAddTCart} />
                )

              }
            </div>
          </div>
        </div>
        </>
      ) : (
        <>
        <div className="w-full lg:w-1/1 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg bg-customYellow border-customGreen">
          <img className="rounded-xl " src={props.imageURL} alt="img" style={{ width: '400px', height: '300px' }} />
          <div className='space-y-4'>
            <h1 className="font-semibold text-center text-xl pt-6">{props.name}</h1>
            <div>
              <h3 className='text-lg'>Specification: {props.specification}</h3>
            </div>
            <div className='flex flex-row items-center justify-center gap-20'>
              <h3 className='font-semibold text-lg'>₹ {props.price}</h3>
              {added ?
                (
                  <>
                    <div className='text-customGreen text-xl '>
                      Product Added !
                    </div>
                  </>
                ) : (
                  <Button title="ADD TO CARD" onClick={handleAddTCart} />
                )

              }
            </div>
          </div>
        </div>
        </>
      )}
    </>
  )
}

export default Card