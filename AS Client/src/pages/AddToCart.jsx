import React, { useEffect, useState } from 'react';
import AddToCartCard from '../layouts/AddToCartCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, userName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/SignUp');
      }, 3000);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchCartData() {
      try {
        const response = await axios.get('http://localhost:8888/addToCart', {
          withCredentials: true,
        });
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
        setLoading(false);
      }
    }

    fetchCartData();
  }, [cartItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoggedIn ? (
        <>
        <div className='w-full'>
          <div className='flex flex-row justify-center pt-10'>
            <div className='w-1/2 flex flex-col items-center'>
              {userName ? (
                <>
                  <div className='text-customGreen text-2xl font-medium mt-10'>{userName} It's Your Cart</div>
                  <hr className="border-t-2 w-1/2 border-customGreen pb-10" />
                </>
              ) : (
                <>
                  <div className='text-customGreen text-2xl font-medium mt-10'> MY CART</div>
                  <hr className="border-t-2 w-1/2 border-customGreen pb-10" />
                </>
              )
              }
              <div className='w-full'>
                <div className='flex flex-col items-center'>
                  {cartItems.length === 0 ? (
                    <h2>Your cart is empty</h2>
                  ) : (
                    cartItems.map((item) => (
                      <AddToCartCard
                        key={item.productId}
                        id={item.productId}
                        imageURL={`http://localhost:8888${item.product.imageURL}`}
                        name={item.product.name}
                        specification={item.product.specification}
                        price={item.product.price}
                        quantity={item.quantity}
                        productType={item.productType}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
      ) : (
        <>
          <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center'>
              <h1 className='text-3xl text-customGreen'>Please SignIn First ! </h1>
            </div>
          </div>
        </>
      )
      }
    </>
  );
}

export default AddToCart;
