import React, { useState, useEffect } from 'react';
import { useGetJobsQuery } from '../app/jobsApiSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [filters, setFilters] = useState({
    salaryFrom: '',
    salaryTo: '',
    type: '',
    city: '',
    homeOffice: '',
  });

  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const params = {};
    if (filters.salaryFrom) params['salaryFrom[$gte]'] = filters.salaryFrom;
    if (filters.salaryTo) params['salaryTo[$lte]'] = filters.salaryTo;
    if (filters.type) params.type = filters.type;
    if (filters.city) params.city = filters.city;
    if (filters.homeOffice) params.homeOffice = filters.homeOffice;
    setQueryParams(params);
  }, [filters]);

  const { data, isLoading } = useGetJobsQuery(queryParams);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 text-teal-100 bg-gray-800 rounded-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-100">Állásajánlatok</h1>
      <div className="mb-6 p-4 bg-gray-700 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Szűrők</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <label className="block">
            <span className="text-gray-300">Fizetés (tól):</span>
            <input
              type="number"
              name="salaryFrom"
              value={filters.salaryFrom}
              onChange={handleChange}
              className="mt-1 p-1 px-2 block w-full rounded-md bg-gray-600 border-gray-500 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Fizetés (ig):</span>
            <input
              type="number"
              name="salaryTo"
              value={filters.salaryTo}
              onChange={handleChange}
              className="mt-1 p-1 px-2  block w-full rounded-md bg-gray-600 border-gray-500 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Foglalkoztatottság típusa:</span>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="mt-1 p-1 px-2  block w-full rounded-md bg-gray-600 border-gray-500 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            >
              <option value="">Minden</option>
              <option value="full-time">Teljes munkaidő</option>
              <option value="part-time">Részmunkaidő</option>
              <option value="internship">Gyakornoki</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-300">Település:</span>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleChange}
              className="mt-1 p-1 px-2  block w-full rounded-md bg-gray-600 border-gray-500 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Home-office:</span>
            <select
              name="homeOffice"
              value={filters.homeOffice}
              onChange={handleChange}
              className="mt-1 p-1 px-2  block w-full rounded-md bg-gray-600 border-gray-500 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            >
              <option value="">Minden</option>
              <option value="1">Igen</option>
              <option value="0">Nem</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data && data.data.map((job) => (
          <div key={job.id} className="p-4 bg-gray-700 rounded-md shadow-md">
            <Link to={`/job/${job.id}`} className="text-xl font-semibold text-purple-400 hover:underline">
              {job.position}
            </Link>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span className="text-gray-400">Cég:</span>
              <span className="text-gray-300">{job.company}</span>
              <span className="text-gray-400">Város:</span>
              <span className="text-gray-300">{job.city}</span>
              <span className="text-gray-400">Fizetés:</span>
              <span className="text-gray-300">{job.salaryFrom} - {job.salaryTo} HUF</span>
              <span className="text-gray-400">Típus:</span>
              <span className="text-gray-300">{job.type}</span>
              <span className="text-gray-400">Home-office:</span>
              <span className="text-gray-300">{job.homeOffice ? 'Igen' : 'Nem'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
