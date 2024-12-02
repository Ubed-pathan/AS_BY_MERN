import React, { useState, useEffect } from 'react'
import Card from '../layouts/Card';
import axios from 'axios';


function Bed() {
  const [bedData, setBedData] = useState([]);

  useEffect(() =>{
    const fetchBedData = async () => {
      try{
        const response = await axios.get('http://localhost:8888/bed');
        setBedData(response.data);
      }
      catch (error) {
        localStorage.removeItem('log');
        console.error('Error fetching images:', error);
      }
    };  
    
    fetchBedData();
    
  }, [bedData]);

  return (
    <>
    <div className='flex flex-col justify-center items-center lg:px-32'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20' >
      {
        bedData.map( (beddata, index) =>(
          <Card 
          key={beddata._id}  
          id={beddata._id} 
          imageURL={`http://localhost:8888${beddata.imageURL}`}      
          name={`${beddata.name}`} 
          specification={`${beddata.specification}`}
          price={`${beddata.price}`}
          productType={beddata.productType}
          />
        ))
      }
    </div>
    </div>
    </>
  )
}

export default Bed