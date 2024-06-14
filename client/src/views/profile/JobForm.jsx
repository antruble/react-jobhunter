import React from 'react';

const JobForm = ({ formData, handleChange, handleSubmit, handleCancel, isFetching }) => {
  return (
    <form onSubmit={handleSubmit}>
      {['company', 'position', 'description', 'city'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 font-semibold">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
      ))}
      {['salaryFrom', 'salaryTo'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 font-semibold">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="number"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Típus:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <option value="full-time">Teljes munkaidő</option>
          <option value="part-time">Részmunkaidő</option>
          <option value="internship">Gyakornoki</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Home office:</label>
        <input
          type="checkbox"
          name="homeOffice"
          checked={formData.homeOffice}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      <div className="mt-2">
        <button type="submit" className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700" disabled={isFetching}>
          {isFetching ? 'Mentés...' : 'Mentés'}
        </button>
        <button type="button" onClick={handleCancel} className="ml-2 bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700">
          Mégse
        </button>
      </div>
    </form>
  );
};

export default JobForm;
