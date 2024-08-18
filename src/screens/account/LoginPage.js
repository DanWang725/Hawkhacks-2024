import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { Box } from '@mui/system';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // WARNING: THIS IS LITERALLY PLAIN TEXT PASSWORD (VERY BAD!!!)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="account-card animated-glowing-border w-[400px] h-fit">
        <div className="w-full flex justify-center items-center bg-white inner">
          <div className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Login
            </h2>
            <Box
              component="form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              noValidate
              autoComplete="off"
            >
              <div className="mb-4">
                <label
                  className="block text-primary text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="example@domain.ca"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="flex w-full">
                  <label
                    className="text-primary text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <button
                    className="ml-auto align-baseline font-bold text-sm text-primary hover:text-blue-800"
                    type="button"
                    onClick={() => {
                      toast.error('Not Implemented :(');
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full mb-4">
                <p className="block text-primary text-center text-sm font-bold">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => {
                      navigate('/signup');
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
              <Button
                type="submit"
                sx={{ color: 'white', width: '100%', textTransform: 'none' }}
                color="tertiary"
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
