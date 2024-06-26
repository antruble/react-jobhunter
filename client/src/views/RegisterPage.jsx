import React, { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../app/authApiSlice';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setToken } from '../app/authApiSlice';
import { useAddExperienceMutation } from '../app/experienceApiSlice';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [cookies, setCookie] = useCookies(['cookie-name']);
  const [register, { isLoading: isFetching }] = useRegisterMutation();
  const [login, { isLoading: isFetching2 }] = useLoginMutation();
  const [addExperience, { isLoading: isFetching3 }] = useAddExperienceMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    role: 'company',
  });
  const [experience, setExperience] = useState(['']);
  const [error, setError] = useState('');

  const handleAddExperience = () => {
    setExperience([...experience, '']);
  };

  const handleExperienceChange = (index, event) => {
    const newExperience = [...experience];
    newExperience[index] = event.target.value;
    setExperience(newExperience);
  };

  const handleRemoveExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const payload = { ...formData };
    try {
      const registerResponse = await register(payload).unwrap();
      const loginResponse = await login({ email: payload.email, password: payload.password, strategy: 'local' }).unwrap();
      setCookie('token', loginResponse.accessToken);
      dispatch(setToken({ token: loginResponse.accessToken, role: loginResponse.user.role, userId: loginResponse.user.id }));

      if (payload.role === 'jobseeker' && experience.length > 0) {
        for (const exp of experience) {
          const [company, title, interval] = exp.split(';');
          const body = { company, title, interval };
          await addExperience(body).unwrap();
        }
      }
      alert('Sikeres regisztráció!');
      window.location.reload();
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.data?.message || 'A regisztráció sikertelen volt. Kérjük, próbálja újra.');
    }
  };

  if (cookies.token) return <Navigate to="/" />;

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-4xl font-bold mb-6 text-center border-purple-500 border-b-2 pb-2">Regisztráció</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="email" className="block pl-2 text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            />
          </div>
          <div>
            <label htmlFor="fullname" className="block pl-2 text-lg font-semibold">
              Teljes név
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block pl-2 text-lg font-semibold">
              Jelszó
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            />
          </div>
          <div>
            <label htmlFor="role" className="block pl-2 text-lg font-semibold">
              Szerepkör
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            >
              <option value="company">Cég</option>
              <option value="jobseeker">Álláskereső</option>
            </select>
          </div>
          {formData.role === 'jobseeker' && (
            <div className="mb-6">
              <label htmlFor="experience" className="block text-sm font-bold mb-2">
                Korábbi munkatapasztalatok
              </label>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4 flex">
                  <input
                    type="text"
                    value={exp}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                    placeholder="Cég;Pozíció;Időtartam"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                További tapasztalat hozzáadása
              </button>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isFetching}
            >
              {isFetching ? 'Regisztrálás...' : 'Regisztráció'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
