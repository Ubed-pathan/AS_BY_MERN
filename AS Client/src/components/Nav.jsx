import React, { useState, useEffect } from "react";
import { IoBedOutline } from "react-icons/io5";
// import Button from '../layouts/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import avtar from '../assets/avtar.jpeg'
import Avatar from 'react-avatar';
import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from '../context/AuthContext';


const Nav = () => {
    const { isLoggedIn, profileImage, logout, userName} = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className='w-full'>
            <div>
                <div>
                    <div className='flex flex-row justify-between p-5 md:px-32 px-5 bg-customGreen'>
                        <div className='flex flex-row items-center cursor-pointer'>
                            <span>
                                <IoBedOutline size={32} className="text-customYellow" />
                            </span>
                            <h1 className='text-3xl font-semibold text-customYellow'> AS Furniture</h1>
                        </div>
                        <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-7">
                            <Link to="/" spy={true} smooth={true} duration={500} className="text-customYellow hover:underline transition-all cursor-pointer">HOME</Link>
                            <Link to="Bed" spy={true} smooth={true} duration={500} className="text-customYellow hover:underline transition-all cursor-pointer">BED</Link>
                            <Link to="Wardrobe" spy={true} smooth={true} duration={500} className="text-customYellow hover:underline transition-all cursor-pointer">WARDROBE</Link>
                            <Link to="Dressing_Table" spy={true} smooth={true} duration={500} className="text-customYellow hover:underline transition-all cursor-pointer">DRESSING TABLE</Link>
                            <Link to="Counter" spy={true} smooth={true} duration={500} className="text-customYellow hover:underline transition-all cursor-pointer">COUNTER</Link>
                            <Link to="Other" spy={true} smooth={true} duration={500} className="text-customYellow hover:underline transition-all cursor-pointer">OTHER</Link>
                            <Link to="Contact" spy={true} smooth={true} duration={500} className="text-customYellow hover:underline transition-all cursor-pointer">CONTACT</Link>

                            {isLoggedIn ?
                                (
                                    <>
                                        {/* this code if user is login */}
                                        <div className='relative group'>
                                            <div className='flex items-center gap-1'>
                                                {profileImage ? (
                                                    <>
                                                    <Avatar src={profileImage} size="40" round={true} />
                                                    <BiChevronDown className="cursor-pointer text-customYellow" size={25} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Avatar src={avtar} size="40" round={true} />
                                                        <BiChevronDown className="cursor-pointer text-customYellow" size={25} />
                                                        {/* <BsPersonCircle className=" text-black" size={30} /> */}
                                                    </>
                                                )}
                                            </div>
                                            <ul className=' w-56 absolute hidden left-1/2 top-full -translate-x-1/2 space-y-2 group-hover:block bg-customYellow border border-customGreen rounded-lg p-5 flex flex-col items-center'>
                                                {userName ? (
                                                        <div className="text-center pb-5    ">
                                                        <p className="text-2xl text-customGreen">{userName}</p>
                                                        <hr className='bg-customGreen w-full h-0.5' />
                                                    </div>
                                                ) : (
                                                    null
                                                )

                                                }
                                                <li className="w-full text-center">
                                                    <Link to="ProfileImage" spy={true} smooth={true} duration={500} className=" text-customGreen hover:underline transition-all cursor-pointer">Add Profile Image</Link>
                                                </li>
                                                <li className="w-full text-center">
                                                    <Link to="AddToCart" spy={true} smooth={true} duration={500} className=" text-customGreen hover:underline transition-all cursor-pointer">Add To Cart</Link>
                                                </li>
                                                <li className="w-full text-center">
                                                    <Link onClick={handleLogout} spy={true} smooth={true} duration={500} className=" text-customGreen hover:underline transition-all cursor-pointer">Logout</Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </>

                                ) : (
                                    <>
                                        {/* this below code for login */}
                                        <div className='relative group'>
                                            <div className='flex items-center gap-1'>
                                                {/* <Avatar src={avtar}  size="40" round={true}/> */}
                                                <BsPersonCircle className=" text-customYellow" size={30} />
                                                {/* <BiChevronDown className= "cursor-pointer text-customYellow" size={25} /> */}
                                            </div>
                                            <ul className=' w-56 absolute hidden left-1/2 top-full -translate-x-1/2 space-y-2 group-hover:block bg-customYellow border border-customGreen rounded-lg p-5 flex flex-col items-center'>
                                                <li className="w-full text-center">
                                                    <Link to="SignIn" spy={true} smooth={true} duration={500} className=" text-customGreen hover:underline transition-all cursor-pointer">SingIn</Link>
                                                </li>
                                                <li className="w-full text-center">
                                                    <Link to="SignUp" spy={true} smooth={true} duration={500} className=" text-customGreen hover:underline transition-all cursor-pointer">SingUp</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )

                            }

                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;