import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8888/user/signin', formData, 
        {
          withCredentials: true  // Important: allows cookies to be sent/received
        }
      );
      if (response.status === 200 && response.data.token) {
        login(response.data.token, response.data.username,response.data.profileImage, response.data.roles);
        toast.success('😃 Login successful! Redirecting...', {
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
        setFormData({ username: '', password: '' });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message, {
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
      } else {
        toast.error('Server error. Please try again later.', {
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
      }
    }
  };

  return (
    <div className='w-full'>
      <div className=' h-screen flex flex-col justify-center items-center mt-10'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col border-2 border-customGreen p-5 rounded-md'>
            <div className='text-customGreen text-3xl text-center'>Sign In</div>

            <label htmlFor="username" className='text-xl font-semibold text-customGreen pt-4'>Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              required
              className='text-lg p-2 border border-customGreen w-96 h-11 rounded-md'
              value={formData.username}
              onChange={handleChange}
            />

            <label htmlFor="password" className='text-xl font-semibold text-customGreen pt-4'>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password."
              required
              className='text-lg p-2 border border-customGreen w-96 h-11 rounded-md'
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="submit"
              value="Sign In"
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

export default SignIn;
