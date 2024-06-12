import React, { useState } from 'react';
import { useLoginMutation } from '../app/authApiSlice';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setToken } from '../app/authApiSlice';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [login, { isLoading: isFetching }] = useLoginMutation();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loginResponse = await login({ email: formData.email, password: formData.password, strategy: 'local' }).unwrap();
      setCookie('token', loginResponse.accessToken);
      console.log(loginResponse);
      let body = { token: loginResponse.accessToken, role: loginResponse.user.role, userId: loginResponse.user.id};
      dispatch(setToken(body));
      console.log(body);
      // window.location.reload();
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.data?.message || 'A bejelentkezés sikertelen volt. Kérjük, próbálja újra.');
    }
  };

  if (cookies.token) return <Navigate to="/" />
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isFetching}
            >
              {isFetching ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
