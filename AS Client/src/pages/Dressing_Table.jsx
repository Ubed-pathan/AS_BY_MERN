import React, { useState, useEffect } from 'react'
import Card from '../layouts/Card';
import axios from 'axios';


function Dressing_Table() {
  const [dressing_tableData, setDressing_TableData] = useState([]);

  useEffect(() =>{
    const fetchDressing_TableData = async () => {
      try{
        const response = await axios.get('http://localhost:8888/dressing_table');
        setDressing_TableData(response.data);
      }
      catch (error) {
        localStorage.removeItem('log');
        console.error('Error fetching images:', error);
      }
    };  
    fetchDressing_TableData();
  }, [dressing_tableData]);

  return (
    <>
    <div className=' flex flex-col justify-center items-center lg:px-32 px-5'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20'>
      {
        dressing_tableData.map( (dressing_tabledata, index) =>(
          <Card 
          key={dressing_tabledata._id} 
          id={dressing_tabledata._id} 
          imageURL={`http://localhost:8888${dressing_tabledata.imageURL}`}      
          name={`${dressing_tabledata.name}`} 
          specification={`${dressing_tabledata.specification}`}
          price={`${dressing_tabledata.price}`}
          productType={dressing_tabledata.productType}
          />
        ))
      }
    </div>
    </div>
    </>
  )
}

export default Dressing_Table