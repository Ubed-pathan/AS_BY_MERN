import React, { useState, useEffect } from 'react'
import Card from '../layouts/Card';
import axios from 'axios';


function Other() {
  const [otherData, setOtherData] = useState([]);
  useEffect(() =>{
    const fetchOtherData = async () => {
      try{
        const response = await axios.get('http://localhost:8888/other');
        setOtherData(response.data);
      }
      catch (error) {
        localStorage.removeItem('log');
        console.error('Error fetching images:', error);
      }
    };  
    fetchOtherData();
  }, [otherData]);

  return (
    <>
    <div className=' flex flex-col justify-center items-center lg:px-32 px-5'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20'>
      {
        otherData.map( (otherdata, index) =>(
          <Card 
          key={otherdata._id}  
          id={otherdata._id}  
          imageURL={`http://localhost:8888${otherdata.imageURL}`}      
          name={`${otherdata.name}`} 
          specification={`${otherdata.specification}`}
          price={`${otherdata.price}`}
          productType={otherdata.productType}
          />
        ))
      }
    </div>
    </div>
    </>
  )
}

export default Other