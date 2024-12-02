import React, { useState, useEffect } from 'react'
import Card from '../layouts/Card';
import axios from 'axios';


function Wardrobe() {
  const [wardrobeData, setWardrobeData] = useState([]);

  useEffect(() =>{
    const fetchWardrobeData = async () => {
      try{
        const response = await axios.get('http://localhost:8888/wardrobe');
        setWardrobeData(response.data);
      }
      catch (error) {
        localStorage.removeItem('log');
        console.error('Error fetching images:', error);
      }
    };  
    fetchWardrobeData();
  }, [wardrobeData]);

  return (
    <>
    <div className='flex flex-col justify-center items-center lg:px-32 px-5'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20'>
      {
        wardrobeData.map( (wardrobedata, index) =>(
          <Card 
          key={wardrobedata._id}  
          id={wardrobedata._id}
          imageURL={`http://localhost:8888${wardrobedata.imageURL}`}      
          name={`${wardrobedata.name}`} 
          specification={`${wardrobedata.specification}`}
          price={`${wardrobedata.price}`}
          productType={wardrobedata.productType}
          />
        ))
      }
    </div>
    </div>
    </>
  )
}

export default Wardrobe