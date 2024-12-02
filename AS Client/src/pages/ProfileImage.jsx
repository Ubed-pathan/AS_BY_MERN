import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SlClose } from "react-icons/sl";
import avtar from '../assets/avtar.jpeg'
import Avatar from 'react-avatar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfileImage() {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const { profileImage, setProfileImage, setUserName } = useAuth();
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        profileImageURL: '',
    });

    function handleImageChange(e) {
        const imageFile = e.target.files[0];
        setFile(imageFile); // Optional: Store the file in a separate state if needed
        setFormData(() => ({
            imageURL: imageFile,
        }));
    }

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
        data.append('profileImageURL', file);

        try {
            const response = await axios.post(`http://localhost:8888/user/profileImage`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // For cookies
            });
            if (response.status == 200) {
                const fullURL = `http://localhost:8888${response.data.profileImage}`;
                setProfileImage(fullURL);
                setUserName("Hello! "+response.data.username);
                toast.success("Profile image uploaded successfully !", {
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
                    category: '',
                    name: '',
                    specification: '',
                    price: '',
                });
                setFile(undefined);
                fileInputRef.current.value = '';

                setTimeout(() => {
                    navigate('/');
                  }, 2000);

            }
            else {
                console.log("hello")
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };


    return (
        <div className='w-full'>
            <div className='flex flex-col justify-center items-center mt-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col border-2 border-customGreen p-5 rounded-md' style={{ width: '600px' }}>
                        <div className='w-full flex flex-row justify-center'>
                            <div className='text-customGreen text-3xl'>Profile Image</div>
                        </div>
                        <div className='flex flex-row justify-center p-3'>
                            <hr className='bg-customGreen w-44 h-0.5' />
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                            {file ? (
                                <Avatar src={URL.createObjectURL(file)} size="200" round={true} />
                            ) : profileImage ? (
                                <Avatar src={profileImage} size="200" round={true} />
                            ): (
                                <Avatar src={avtar} size="200" round={true} />
                            )}


                            <div className='flex flex-row justify-between'>
                                <input id="image" type="file" name="imageURL" onChange={handleImageChange} ref={fileInputRef} />
                                {file && (
                                    <>
                                        <div>
                                            <button onClick={handleRemoveImage} className='text-red-700 text-lg hover:underline'>Remove</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>


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
    );
}

export default ProfileImage;
