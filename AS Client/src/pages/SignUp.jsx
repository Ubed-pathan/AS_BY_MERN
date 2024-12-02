import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
      const response = await axios.post('http://localhost:8888/user/signup', formData, 
        {
          withCredentials: true  // Important: allows cookies to be sent/received
        }
      );

      if (response.status === 200) {
        toast.success('😃 Sign-up successful! Redirecting...', {
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
          username: '',
          email: '',
          password: '',
        });

        setTimeout(() => {
          navigate('/SignIn');
        }, 2000);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
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
            <div className='w-full flex flex-row justify-center'>
              <div className='text-customGreen text-3xl'>SignUp</div>
            </div>
            <div className='flex flex-row justify-center p-3'>
              <hr className='bg-customGreen w-44 h-0.5' />
            </div>

            <label htmlFor="username" className='text-xl font-semibold text-customGreen'>Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              required
              className='text-lg p-2 border border-customGreen w-96 h-11 rounded-md'
              value={formData.username}
              onChange={handleChange}
            />

            <label htmlFor="email" className='text-xl font-semibold text-customGreen pt-4'>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              className='text-lg p-2 border border-customGreen w-96 h-11 rounded-md'
              value={formData.email}
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
              value="SignUp"
              className="w-full p-2 mt-5 border-2 border-customGreen text-customGreen rounded-md text-lg cursor-pointer
                        bg-customYellow transition-colors duration-500 ease-in-out
                        hover:bg-customGreen hover:text-customYellow"
            />
          </div>
        </form>
        <div className='flex justify-center mt-4'>
          <p className='text-lg'>
            Already have an account?{' '}
            <span
              className='text-customGreen font-semibold cursor-pointer'
              onClick={() => navigate('/SignIn')}
            >
              SignIn
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
