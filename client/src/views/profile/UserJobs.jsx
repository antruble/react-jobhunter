import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteJobByIdMutation, useModifyJobMutation } from '../../app/experienceApiSlice';
// import { useDeleteJobMutation, useModifyJobMutation } from '../../app/experienceApiSlice';

const UserJobs = ({ jobs }) => {
  const [deleteJob, { isLoading: isDeleteJobFetching }] = useDeleteJobByIdMutation();
  const [modifyJob, { isLoading: isModifyJobFetching }] = useModifyJobMutation();
  const [editingJobId, setEditingJobId] = useState(null);
  const [editJobFormData, setEditJobFormData] = useState({
    position: '',
    description: '',
    city: '',
    salaryFrom: '',
    salaryTo: '',
    type: '',
    homeOffice: false,
  });

  const handleJobEdit = (job) => {
    setEditingJobId(job.id);
    setEditJobFormData({
      position: job.position,
      description: job.description,
      city: job.city,
      salaryFrom: job.salaryFrom,
      salaryTo: job.salaryTo,
      type: job.type,
      homeOffice: job.homeOffice,
    });
  };

  const handleCancelJobEdit = () => {
    setEditingJobId(null);
    setEditJobFormData({
      position: '',
      description: '',
      city: '',
      salaryFrom: '',
      salaryTo: '',
      type: '',
      homeOffice: false,
    });
  };

  const handleJobEditChange = (e) => {
    const { name, value } = e.target;
    setEditJobFormData({
      ...editJobFormData,
      [name]: value,
    });
  };

  const handleJobEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await modifyJob({ id: editingJobId, ...editJobFormData }).unwrap();
      alert('Módosítás sikeres!');
      setEditingJobId(null);
      setEditJobFormData({
        position: '',
        description: '',
        city: '',
        salaryFrom: '',
        salaryTo: '',
        type: '',
        homeOffice: false,
      });
      window.location.reload();
    } catch (err) {
      console.error('Failed to modify job:', err);
      alert('Módosítás sikertelen. Kérjük, próbálja újra.');
    }
  };

  const handleJobDelete = async (id) => {
    try {
      await deleteJob(id).unwrap();
      alert('Törlés sikeres!');
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Törlés sikertelen. Kérjük, próbálja újra.');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-black font-semibold mb-4">Álláshirdetéseim</h2>
      <div className="mb-4">
        <Link to="/add-job" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Hozzáadás</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 bg-gray-100 rounded-md shadow-md">
            {editingJobId === job.id ? (
              <form onSubmit={handleJobEditSubmit}>
                <div>
                  <label className="block text-gray-700 font-semibold">Pozíció:</label>
                  <input
                    type="text"
                    name="position"
                    value={editJobFormData.position}
                    onChange={handleJobEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Leírás:</label>
                  <textarea
                    name="description"
                    value={editJobFormData.description}
                    onChange={handleJobEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Város:</label>
                  <input
                    type="text"
                    name="city"
                    value={editJobFormData.city}
                    onChange={handleJobEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Fizetés (tól):</label>
                  <input
                    type="number"
                    name="salaryFrom"
                    value={editJobFormData.salaryFrom}
                    onChange={handleJobEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Fizetés (ig):</label>
                  <input
                    type="number"
                    name="salaryTo"
                    value={editJobFormData.salaryTo}
                    onChange={handleJobEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Típus:</label>
                  <select
                    name="type"
                    value={editJobFormData.type}
                    onChange={handleJobEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <option value="full-time">Teljes munkaidő</option>
                    <option value="part-time">Részmunkaidő</option>
                    <option value="internship">Gyakornoki</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Home office:</label>
                  <input
                    type="checkbox"
                    name="homeOffice"
                    checked={editJobFormData.homeOffice}
                    onChange={(e) => setEditJobFormData({ ...editJobFormData, homeOffice: e.target.checked })}
                    className="mt-1"
                  />
                </div>
                <div className="mt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700"
                    disabled={isModifyJobFetching}
                  >
                    {isModifyJobFetching ? 'Mentés...' : 'Mentés'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelJobEdit}
                    className="ml-2 bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
                  >
                    Mégse
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{job.position}</h3>
                <p className="text-gray-700">{job.description}</p>
                <p className="text-gray-700">{job.city}</p>
                <p className="text-gray-700">{job.salaryFrom} - {job.salaryTo} HUF</p>
                <p className="text-gray-700">{job.type}</p>
                <p className="text-gray-700">{job.homeOffice ? 'Home office lehetőség' : 'Nincs home office lehetőség'}</p>
                <button
                  onClick={() => handleJobEdit(job)}
                  className="mt-2 bg-yellow-600 text-white py-1 px-2 rounded-md hover:bg-yellow-700"
                >
                  Szerkesztés
                </button>
                <button
                  onClick={() => handleJobDelete(job.id)}
                  className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  disabled={isDeleteJobFetching}
                >
                  {isDeleteJobFetching ? 'Törlés...' : 'Törlés'}
                </button>
                <Link to={`/job/${job.id}`} className="mt-2 bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 inline-block">
                  Megtekintés
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserJobs;
