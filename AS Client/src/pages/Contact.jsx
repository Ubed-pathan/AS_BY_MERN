import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    mobile: '',
    suggestion: '',
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
    console.log("outside try")
    try {
      console.log("inside try")
      const response = await axios.post('http://localhost:8888/contactform', formData,
        {
          withCredentials: true  // Important: allows cookies to be sent/received
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        toast.success('😃 Thank You ! for submit the form', {
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
          name: '',
          email: '',
          gender: '',
          mobile: '',
          suggestion: '',
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.log("inside catch")
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
        setTimeout(() => {
          navigate('/SignUp');
        }, 2000);
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
    <>
      <div className='w-full'>
        <div className='flex flex-col justify-center items-center'>
          <div className='justify-center items-center text-3xl pt-5 text-customGreen'>CONTACT US</div>
          <hr className='bg-customGreen w-[600px] h-0.5' />
          <div className='flex flex-row justify-around items-center pt-10'>
            <div className=' flex flex-col justify-center items-center border border-customYellow hover:border-customGreen hover:rounded-lg p-6'>
              <IoTimeOutline size={30} className="text-customGreen" />
              <div className="text-customGreen text-lg">OPENING HOURS</div>
              <div className="text-customGreen">Monday - Saturday : 10am to 8pm</div>
              <div className="text-customGreen">Sunday : Close.</div>
            </div>
            <div className=' flex flex-col justify-center items-center border border-customYellow hover:border-customGreen hover:rounded-lg p-6'>
              <CiLocationOn size={30} className="text-customGreen" />
              <div className="text-customGreen text-lg">ADDRESS</div>
              <div className="text-customGreen">Venkatesh Nagar, Road NO.02, </div>
              <div className="text-customGreen">Near Amba Hanuman, Ambajogai</div>
              <div className="text-customGreen">Road, latur-413512</div>
            </div>
            <div className=' flex flex-col justify-center items-center border border-customYellow hover:border-customGreen hover:rounded-lg p-6'>
              <LuPhoneCall size={25} className="text-customGreen" />
              <div className="text-customGreen text-lg">CONTACT NO. / WHATSAPP NO</div>
              <div className="text-customGreen">Monday - Saturday : 10am to 8pm</div>
              <div className="text-customGreen">Sunday : Close.</div>
            </div>
            <div className=' flex flex-col justify-center items-center border border-customYellow hover:border-customGreen hover:rounded-lg  p-6'>
              <MdOutlineAttachEmail size={30} className="text-customGreen" />
              <div className="text-customGreen text-lg">EMAIL ID</div>
              <div className="text-customGreen">younusbaig354@gmail.com</div>
            </div>
          </div>

          <div className='justify-center items-center text-3xl pt-10 text-customGreen'>CONTACT FORM</div>
          <hr className='bg-customGreen w-[600px] h-0.5' />
          <div className='flex flex-col justify-center items-center pt-10'>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col border-2 border-customGreen p-5 rounded-md'>
                  <label for="name" className='text-xl font-semibold text-customGreen'>Name:</label>
                  <input type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    required
                    className='text-lg p-2 border border-customGreen w-96 h-11 rounded-md'
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <label for="email" className='text-xl font-semibold text-customGreen pt-4'>Email:</label>
                  <input type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                    className='text-lg p-2 border border-customGreen w-96 h-11 rounded-md'
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <div className='flex flex-row justify-start gap-4 pt-5 text-lg font-semibold text-customGreen '>
                    <label for="gender" className='text-xl font-semibold text-customGreen'>Gender:</label>
                    <input type="radio"
                      name="gender"
                      required
                      className='text-xl font-semibold text-customGreen'
                      value="male"
                      onChange={handleChange}
                      checked={formData.gender === "male"}
                    /> Male
                    <input type="radio"
                      name="gender"
                      required
                      className='text-xl font-semibold text-customGreen'
                      value="female"
                      onChange={handleChange}
                      checked={formData.gender === "male"}
                    /> Female
                  </div>

                  <label for="mobile_no" className='text-xl font-semibold text-customGreen pt-4'>Mobile No. :</label>
                  <input type="text"
                    name="mobile"
                    placeholder="Enter Mobile No."
                    required
                    className='text-lg p-2 border border-customGreen w-96 h-11 rounded-md'
                    value={formData.mobile}
                    onChange={handleChange}
                  />

                  <label for="suggestion" className='text-xl font-semibold text-customGreen pt-4'>Suggestion:</label>
                  <textarea type="text"
                    name="suggestion"
                    rows="5"
                    cols="50"
                    placeholder="Enter Your Suggestion Or Questions"
                    required
                    className='text-lg p-2 border border-customGreen w-96 h-20 rounded-md'
                    value={formData.suggestion}
                    onChange={handleChange}
                  />
                  <input
                    type="submit"
                    value="SUBMIT"
                    className="w-full p-2 mt-5 border-2 border-customGreen text-customGreen rounded-md text-lg cursor-pointer
                               bg-customYellow transition-colors duration-500 ease-in-out
                                hover:bg-customGreen hover:text-customYellow"
                  />

                </div>
              </form>


            </div>
          </div>
        </div>
        <div className="text-center flex flex-col justify-center items-center">
          <div className="text-[#436850] text-2xl pt-14 ">MAP FOR ADDRESS
            <hr className='bg-customGreen w-[800px] h-0.5 justify-center mt-0.5' />
          </div>

          <div className="iframe_container w-full mt-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15142.42158311862!2d76.5682648!3d18.410802!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf838bcf202de7%3A0x8efbbacb8198de37!2sAS%20FURNITURE!5e0!3m2!1sen!2sin!4v1713092239072!5m2!1sen!2sin"
              className="w-[1200px] h-[500px] border-none mx-auto"
              id="google_map"
              title="Google Map"
            ></iframe>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Contact