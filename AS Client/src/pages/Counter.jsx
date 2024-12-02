import React, { useState, useEffect } from 'react'
import Card from '../layouts/Card';
import axios from 'axios';


function Counter() {
  const [counterData, setCounterData] = useState([]);

  useEffect(() =>{
    const fetchCounterData = async () => {
      try{
        const response = await axios.get('http://localhost:8888/counter');
        setCounterData(response.data);
      }
      catch (error) {
        localStorage.removeItem('log');
        console.error('Error fetching images:', error);
      }
    };  
    fetchCounterData();
  }, [counterData]);

  return (
    <>
    <div className='flex flex-col justify-center items-center lg:px-32 px-5'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20'>
      {
        counterData.map( (counterdata, index) =>(
          <Card 
          key={counterdata._id} 
          id={counterdata._id}  
          imageURL={`http://localhost:8888${counterdata.imageURL}`}      
          name={`${counterdata.name}`} 
          specification={`${counterdata.specification}`}
          price={`${counterdata.price}`}
          productType={counterdata.productType}
          />
        ))
      }
    </div>
    </div>
    </>
  )
}

export default Counter