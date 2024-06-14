import React, { useState } from 'react';
import { useAddJobMutation } from '../app/experienceApiSlice';
import { useNavigate } from 'react-router-dom';

const AddJobPage = () => {
  const [addJob, { isLoading }] = useAddJobMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: '',
    salaryTo: '',
    type: '',
    city: '',
    homeOffice: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...formData,
      salaryFrom: Number(formData.salaryFrom),
      salaryTo: Number(formData.salaryTo),
    };

    try {
      await addJob(payload).unwrap();
      alert('Állás sikeresen hozzáadva!');
      navigate('/profile'); // Navigate to the profile page after adding the job
    } catch (err) {
      console.error('Failed to add job:', err);
      setError('Az állás hozzáadása sikertelen volt. Kérjük, próbálja újra.');
    }
  };

  return (
    <div className="flex items-center justify-center mt-16 w-full">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center border-purple-500 border-b-2 pb-2">Új Állás Hozzáadása</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company" className="block pl-2 text-lg font-semibold">
              Cég
            </label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            />
          </div>
          <div>
            <label htmlFor="position" className="block pl-2 text-lg font-semibold">
              Pozíció
            </label>
            <input
              type="text"
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block pl-2 text-lg font-semibold">
              Leírás
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="salaryFrom" className="block pl-2 text-lg font-semibold">
                Fizetés (tól)
              </label>
              <input
                type="number"
                name="salaryFrom"
                id="salaryFrom"
                value={formData.salaryFrom}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
              />
            </div>
            <div>
              <label htmlFor="salaryTo" className="block pl-2 text-lg font-semibold">
                Fizetés (ig)
              </label>
              <input
                type="number"
                name="salaryTo"
                id="salaryTo"
                value={formData.salaryTo}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="type" className="block pl-2 text-lg font-semibold">
              Típus
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            >
              <option value="">Válassz típust</option>
              <option value="full-time">Teljes munkaidő</option>
              <option value="part-time">Részmunkaidő</option>
              <option value="internship">Gyakornoki</option>
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block pl-2 text-lg font-semibold">
              Város
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-200 border-2 rounded-md shadow-sm bg-gray-200 focus:border-2"
            />
          </div>
          <div>
            <label htmlFor="homeOffice" className="block pl-2 text-lg font-semibold">
              Home office lehetőség
            </label>
            <input
              type="checkbox"
              name="homeOffice"
              id="homeOffice"
              checked={formData.homeOffice}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Mentés...' : 'Állás hozzáadása'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
