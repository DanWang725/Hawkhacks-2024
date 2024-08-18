import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="account-card animated-glowing-border w-[400px] h-fit">
        <div className="w-full flex justify-center items-center bg-white inner">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">
                Sign Up
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-primary text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
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
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-primary text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="********"
                  />
                </div>
                <div className="w-full mb-4">
                  <p className="block text-primary text-center text-sm font-bold">
                    Already have an account?{' '}
                    <button
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      Log In
                    </button>
                  </p>
                </div>
                <Button
                  sx={{ color: 'white', width: '100%', textTransform: 'none' }}
                  color="tertiary"
                  variant="contained"
                >
                  Create Account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
