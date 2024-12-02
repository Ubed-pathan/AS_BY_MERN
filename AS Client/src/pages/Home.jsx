import React, { useState, useEffect } from 'react'
import Card from '../layouts/Card';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


function Home() {
  const [homeData, setHomeData] = useState([]);
  const { serverNotConnect} = useAuth();

  useEffect(() =>{
    const fetchHomeData = async () => {
      try{
        const response = await axios.get('http://localhost:8888/home');
        setHomeData(response.data);
      }
      catch (error) {
        serverNotConnect();
        console.error('Error fetching images:', error);
      }
    };  
    fetchHomeData();
  }, [homeData]);

  return (
    <>
    <div className='flex flex-col justify-center items-center lg:px-32 px-5'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20'>
      {
        homeData.map( (homedata, index) =>(
          <Card 
          key={homedata._id}  
          id={homedata._id}  
          imageURL={`http://localhost:8888${homedata.imageURL}`}      
          name={`${homedata.name}`} 
          specification={`${homedata.specification}`}
          price={`${homedata.price}`}
          productType={homedata.productType}
          />
        ))
      }
    </div>
    </div>
    </>
  )
}

export default Home