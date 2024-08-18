import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { postNewAccount } from '../../api/accounts';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // WARNING: THIS IS LITERALLY PLAIN TEXT PASSWORD (VERY BAD!!!)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    postNewAccount({ username, email, password })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/`);
          toast.success('Account created successfully!');
        } else {
          toast.error('Failed to Create Account! :(');
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="account-card animated-glowing-border w-[400px] h-fit">
        <div className="w-full flex justify-center items-center bg-white inner">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">
                Sign Up
              </h2>
              <Box
                component="form"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                autoComplete="off"
              >
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
                    required
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isSubmitting}
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
                    required
                    placeholder="example@domain.ca"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
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
                    required
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-full mb-4">
                  <p className="block text-primary text-center text-sm font-bold">
                    Already have an account?{' '}
                    <button
                      onClick={() => {
                        navigate('/login');
                      }}
                      className="underline"
                    >
                      Log In
                    </button>
                  </p>
                </div>
                <Button
                  type="submit"
                  sx={{ color: 'white', width: '100%', textTransform: 'none' }}
                  color="tertiary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Create Account
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
