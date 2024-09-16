import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AppContext } from '../context/AppContext';


const Login = () => {
  const inputRefs = useRef({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {user,setUser,isLoggedIn,setIsLoggedIn}=useContext(AppContext)

  const handleLogin = async () => {
    try {

      const email = inputRefs.current['email'].value;
      const password = inputRefs.current['password'].value;

      if (!email || !password) {
        setError('All Fields Are Required');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/v1/login/', {
        cred:email,
        password: password,
      });
      
      if (response.data.status===200){
        // dispatch(setLogin(true))
        // dispatch(setUserInfo({'email':response.data.user.email,'name':response.data.user.name}))
        localStorage.setItem('jwt',response.data.jwt)
        // dispatch(sendToast("Welcome , "+response.data.user.name))
        navigate('/');
      }
      else{
        setError("Some Error Occured while Logging IN")
      }
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message); 
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleGoogleAuth = async (googleUser) => {
    try {
      const token = googleUser.credential;
      const response = await axios.post('http://localhost:8000/api/v1/google-auth/', {
        token: token
      });
      
      
      if (response.data.status===200){
        setIsLoggedIn(true)
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-yellow-400">Login</h2>
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
        <div>
          <label
            htmlFor="email-or-phone"
            className="block text-sm font-medium text-yellow-400"
          >
            Email or Phone Number
          </label>
          <input
            id="email-or-phone"
            name="email-or-phone"
            type="text"
            required
            placeholder="Enter your email or phone number"
            ref={(el) => (inputRefs.current["email"] = el)}
            className="w-full px-3 py-2 mt-1 text-yellow-400 outline-none bg-gray-700 border border-gray-500 rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-yellow-400"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            ref={(el) => {
              inputRefs.current["password"] = el;
            }}
            className="w-full px-3 py-2 mt-1 text-yellow-400 outline-none bg-gray-700 border border-gray-500 rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
          <div className="mt-2 text-sm text-left">
            <Link
              to="/forgot-password"
              className="text-yellow-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-[#234459] rounded-md hover:bg-[#2d5771] focus:ring focus:ring-yellow-400"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-yellow-400">OR</span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
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
            Don't have an account?{" "}
            <Link to="/signup" className=" hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
