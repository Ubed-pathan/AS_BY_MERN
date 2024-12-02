import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SlClose } from "react-icons/sl";

function Admin() {
    const { isAdmin, userName, isLoggedIn } = useAuth();
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        imageURL: '',
        productType: '',
        name: '',
        specification: '',
        price: '',
    });

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         setTimeout(() => {
    //             navigate('/SignUp');
    //         }, 3000);
    //     }

    //     if(!isAdmin){
    //         setTimeout(() => {
    //             navigate('/');
    //         }, 3000);
    //     }
    // }, [isLoggedIn, navigate]);

    function handleImageChange(e) {
        const imageFile = e.target.files[0];
        setFile(imageFile); // Optional: Store the file in a separate state if needed
        setFormData((prevData) => ({
            ...prevData,
            imageURL: imageFile,
        }));
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRemoveImage = () => {
        setFile(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input value
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send the image file
        const data = new FormData();
        data.append('imageURL', file);
        data.append('productType', formData.productType);
        data.append('name', formData.name);
        data.append('specification', formData.specification);
        data.append('price', formData.price);

        try {
            const response = await axios.post(`http://localhost:8888/${formData.productType}/upload`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // For cookies
            });
            if (response.status == 200) {
                toast.success(response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });

                setFormData({
                    imageURL: '',
                    productType: '',
                    name: '',
                    specification: '',
                    price: '',
                });
                setFile(undefined);
                fileInputRef.current.value = '';
            }
            else {
                console.log("hello")
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };
    
    return (
        <>
            {isLoggedIn ? (
                isAdmin ? (
                    <>
                        <div className='w-full'>
                            <div className='flex flex-col justify-center items-center mt-10'>
                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col border-2 border-customGreen p-5 rounded-md' style={{ width: '600px' }}>
                                        <div className='w-full flex flex-row justify-center'>
                                            <div className='text-customGreen text-3xl'>ADMIN</div>
                                        </div>
                                        <div className='flex flex-row justify-center p-3'>
                                            <hr className='bg-customGreen w-44 h-0.5' />
                                        </div>

                                        <label htmlFor="username" className='text-xl font-semibold text-customGreen'>Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter Name Of Furniture"
                                            required
                                            className='text-lg p-2 border border-customGreen w-full h-11 rounded-md'
                                            value={formData.name}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="productType" className='text-xl font-semibold text-customGreen pt-4'>ProductType:</label>
                                        <select
                                            name="productType"
                                            className='text-lg p-2 border border-customGreen w-full h-11 rounded-md'
                                            value={formData.productType}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select Furniture ProductType</option>
                                            <option value="home">HOME</option>
                                            <option value="bed">BED</option>
                                            <option value="counter">COUNTER</option>
                                            <option value="dressing_table">DRESSING_TABLE</option>
                                            <option value="other">OTHER</option>
                                            <option value="wardrobe">WARDROBE</option>
                                        </select>

                                        <label htmlFor="specification" className='text-xl font-semibold text-customGreen pt-4'>Specification:</label>
                                        <input
                                            type="text"
                                            name="specification"
                                            placeholder="Enter Specification Of Furniture."
                                            required
                                            className='text-lg p-2 border border-customGreen w-full h-11 rounded-md'
                                            value={formData.specification}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="price" className='text-xl font-semibold text-customGreen pt-4'>Price:</label>
                                        <input
                                            type="text"
                                            name="price"
                                            placeholder="Enter Price Of Furniture."
                                            required
                                            className='text-lg p-2 border border-customGreen w-full h-11 rounded-md'
                                            value={formData.price}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="image" className='text-xl font-semibold text-customGreen pt-4'>Image:</label>
                                        <div className='flex flex-row justify-between'>
                                            <input id="image" type="file" name="imageURL" onChange={handleImageChange} ref={fileInputRef} />
                                            {file && (
                                                <>
                                                    <div>
                                                        <SlClose size={25} className='text-red-800 cursor-pointer' onClick={handleRemoveImage} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        {file && (
                                            <img
                                                src={URL.createObjectURL(formData.imageURL)}
                                                alt="Preview"
                                                style={{ width: '600px', height: '350px', objectFit: "fill", marginTop: '10px' }}
                                            />
                                        )}

                                        <input
                                            type="submit"
                                            value="ADD"
                                            className="w-full p-2 mt-5 border-2 border-customGreen text-customGreen rounded-md text-lg cursor-pointer
                        bg-customYellow transition-colors duration-500 ease-in-out
                        hover:bg-customGreen hover:text-customYellow"
                                        />
                                    </div>
                                </form>
                            </div>
                            <ToastContainer />
                        </div>
                    </>
                ) : (
                    <>
                        <div className='w-full h-screen flex items-center justify-center'>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-3xl text-customGreen'>You are not admin</h1>
                            </div>
                        </div>
                    </>
                )
            ) : (
                <>
                    <div className='w-full h-screen flex items-center justify-center'>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-3xl text-customGreen'>Please SignIn First !</h1>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}

export default Admin;
