import React from 'react';

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="account-card animated-glowing-border w-[400px] h-fit">
        <div className="w-full flex justify-center items-center bg-white inner">
          <div className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-[#1E2A69] mb-6">
              Login
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-[#1E2A69] text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#1E2A69] leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <div className="flex w-full">
                  <label
                    className="text-[#1E2A69] text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="ml-auto align-baseline font-bold text-sm text-[#1E2A69] hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#1E2A69] mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="********"
                />
              </div>
              <div className="w-full mb-4">
                <p className="block text-[#1E2A69] text-center text-sm font-bold">
                  Don&apos;t have an account? <a href="/signup">Sign Up</a>
                </p>
              </div>
              <button
                className="w-full bg-[#1E2A69] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
