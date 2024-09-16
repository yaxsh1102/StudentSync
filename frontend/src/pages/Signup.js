import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import useGetUser from '../hooks/useGetUser';


const Signup = () => {
  const inputRefs = useRef({});
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
  const emailRegex = new RegExp(emailPattern);


  const handleGetOtp =async()=>{
    const email = inputRefs.current['email'].value;
    const isValidEmail = (email) => emailRegex.test(email);   
    
    if(isValidEmail){
      try{
        await axios.post('http://localhost:8000/api/v1/getotp/',{"email":email})
        setError("Otp sent successfully to "+email)
      }
      catch(err){
        console.log(err)
        setError("Error while sending Otp")
      }
    }
    else{
      setError("Please enter a valid Email ")
    }
}

  const handleSignup = async () => {
  
    try {
      const fullName = inputRefs.current['full-name'].value;
      const email = inputRefs.current['email'].value;
      const contactNumber = inputRefs.current['contact-number'].value || null;
      const password = inputRefs.current['password'].value;
      const otp = inputRefs.current['otp'].value;

      if (!fullName || !email || !password  || !otp) {
        setError('Please fill all the fields');
        return
      }

      const response = await axios.post('http://localhost:8000/api/v1/signup/', {
        name:fullName,
        email:email,
        phone:contactNumber,
        password:password,
        otp:otp,
      });

      if (response.data.status===200){
        localStorage.setItem('jwt',response.data.jwt)
        navigate('/login');
      }
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message); 
      } else {
        setError('An unexpected error occurred.'+error);
      }
    }
  };


  const handleGoogleAuth = async (googleUser) => {
    try {
      const token = googleUser.credential;
      const response = await axios.post('http://localhost:8000/api/v1/google-auth/', {
        token: token
      });

      // dispatch(setLogin(true));
      // dispatch(setUserInfo({
      //   email: response.data.email,
      //   name: response.data.name,
      // }));
      if (response.data.status===200){
        localStorage.setItem('jwt',response.data.jwt)
        
        navigate('/');
      }

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'An error occurred.');
      } else {
        setError('An unexpected error occurred.'+error);
      }
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen py-6 bg-gray-900">
      <div className="w-full max-w-md p-8  bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-2">Sign Up</h2>
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium text-yellow-400">
            Full Name <sup className='text-red-500 text-base'>*</sup>
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current["full-name"] = el)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-yellow-400">
            Email <sup className='text-red-500 text-base'>*</sup>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current["email"] = el)}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="contact-number"
            className="block text-sm font-medium text-yellow-400"
          >
            Contact Number
          </label>
          <input
            id="contact-number"
            name="contact-number"
            type="tel"
            required
            placeholder="Enter your contact number"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current["contact-number"] = el)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-yellow-400">
            Password <sup className='text-red-500 text-base'>*</sup>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current['password'] = el)}
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 items-center">
          <button
            onClick={handleGetOtp}
            type="button"
            className="col-span-1 px-4 py-2 font-bold text-white outline-none bg-[#4e4b48] border-gray-300 rounded-md hover:bg-gray-900 focus:ring focus:ring-indigo-400"
          >
            Get OTP <sup className='text-red-500 text-base'>*</sup>
          </button>
          <input
            id="otp"
            name="otp"
            type="text"
            required
            placeholder="Enter OTP"
            className="col-span-2 px-3 py-2 text-black outline-none bg-[#4e4b48] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
            ref={(el) => (inputRefs.current['otp'] = el)}
          />
        </div>
        <div>
          <button
            className="w-full px-4 py-2 mt-2 font-bold text-black bg-yellow-400 rounded-md hover:bg-yellow-500 focus:ring focus:ring-yellow-400"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-yellow-400">OR</span>
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <GoogleOAuthProvider clientId='1074917906223-pf2simq4kkr0itiue7f7ofb9t6bbikfq.apps.googleusercontent.com'>
            <GoogleLogin
              onSuccess={handleGoogleAuth}
              onFailure={(error) => setError('Google Sign-In failed')}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
        <div className="mt-6 text-center text-yellow-400">
          <p>
            Already have an account?{" "}
            <Link to="/login" className=" hover:text-yellow-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
