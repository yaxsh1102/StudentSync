import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const inputRefs = useRef({});
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function loginHandler() {
    const email = inputRefs.current['email'].value;
    const password = inputRefs.current['password'].value;

    if (!email || !password) {
      setError('All Fields Are Required');
      return;
    }
    setError('');
    login(email, password);
  }

  async function login(email, password) {
    // Implement login logic
  }

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    // Implement Google login success logic
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-yellow-400">Login</h2>
        <div className="text-center text-yellow-500">
          <p>{error}</p>
        </div>
        <div>
          <label htmlFor="email-or-phone" className="block text-sm font-medium text-yellow-400">
            Email or Phone Number
          </label>
          <input
            id="email-or-phone"
            name="email-or-phone"
            type="text"
            required
            placeholder="Enter your email or phone number"
            ref={(el) => (inputRefs.current['email'] = el)}
            className="w-full px-3 py-2 mt-1 text-yellow-400 outline-none bg-gray-700 border border-gray-500 rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-yellow-400">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            ref={(el) => { inputRefs.current['password'] = el; }}
            className="w-full px-3 py-2 mt-1 text-yellow-400 outline-none bg-gray-700 border border-gray-500 rounded-md hover:border-yellow-400 focus:border-yellow-400 focus:ring focus:ring-yellow-400"
          />
          <div className="mt-2 text-sm text-left">
            <Link to="/forgot-password" className="text-yellow-400 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-[#234459] rounded-md hover:bg-[#2d5771] focus:ring focus:ring-yellow-400"
            onClick={loginHandler}
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
          {/* <GoogleLogin
            render={renderProps => (
              <button onClick={renderProps.onClick} style={{
                width: '100%',
                backgroundColor: '#4285F4'
              }}>Login with Google</button>
            )}
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          /> */}
        </div>
        <div className="mt-6 text-center text-yellow-400">
          <p>
            Don't have an account?{' '}
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
