import React from 'react'
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";

function Footer() {
    return (
            <div className='w-ful mt-10'>
                <div>
                    <div className='flex flex-row justify-between p-5 md:px-32 px-5 bg-customGreen'>
                        <div className='flex flex-row items-center'>
                            <span>
                                <LuPhoneCall size={20} className="text-customYellow" />
                            </span>
                            <h1 className='text-xl  text-customYellow ml-1'>Contact : 8888508347 </h1>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span>
                                <MdOutlineAttachEmail size={25} className="text-customYellow" />
                            </span>
                            <h1 className='text-xl  text-customYellow ml-1'>Email : younusbaig354@gmail.com </h1>
                        </div>
                    </div>
                    <div className='mt-0.5'></div>
                    <div className='flex flex-row justify-center p-3 md:px-32 px-5 bg-customGreen'>
                    <div className='flex flex-row items-center cursor-pointer'>
                            <span>
                                <IoBedOutline size={30} className="text-customYellow"/>
                            </span> 
                            <h1 className='text-xl text-customYellow ml-6'> AS Furniture &copy; 2024 All Rights Reserves</h1>
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default Footer;