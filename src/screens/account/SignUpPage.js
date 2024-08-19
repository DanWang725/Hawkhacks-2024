import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { completeNewAccountProcess } from '../../api/accounts';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/UserContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // if user is signed in, redirect to home page
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submitRegistration = async () => {
    const response = await completeNewAccountProcess({
      username,
      email,
      password,
    });
    console.log('completeNewAccountProcess response: ', response);

    if (response.status === 200) {
      setUser(response.data?.username);
      toast.success('Account created successfully!');
      navigate(`/`);
    } else {
      toast.error(response.detail);
    }
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    if (password === confirmPassword) {
      if (password.length >= 8) {
        submitRegistration();
      } else {
        toast.error('Password must be at least 8 characters long!');
      }
    } else {
      toast.error('Passwords do not match!');
    }

    setIsSubmitting(false);
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
                <div className="mb-4">
                  <label
                    className="block text-primary text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-primary mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    required
                    placeholder="********"
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
