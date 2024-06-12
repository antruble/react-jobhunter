import React, { useState } from 'react';
import { useDeleteExperienceMutation, useModifyExperienceMutation } from '../../app/experienceApiSlice';

const UserExperiences = ({ experiences }) => {
  const [deleteExperience, { isLoading: isFetching }] = useDeleteExperienceMutation();
  const [modifyExperience, { isLoading: isModifyFetching }] = useModifyExperienceMutation();
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    company: '',
    title: '',
    interval: '',
  });

  const handleEdit = (experience) => {
    setEditingId(experience.id);
    setEditFormData({
      company: experience.company,
      title: experience.title,
      interval: experience.interval,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({
      company: '',
      title: '',
      interval: '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await modifyExperience({ id: editingId, ...editFormData }).unwrap();
      alert('Módosítás sikeres!');
      setEditingId(null);
      setEditFormData({
        company: '',
        title: '',
        interval: '',
      });
      window.location.reload();
    } catch (err) {
      console.error('Failed to modify experience:', err);
      alert('Módosítás sikertelen. Kérjük, próbálja újra.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id).unwrap();
      alert('Törlés sikeres!');
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete experience:', err);
      alert('Törlés sikertelen. Kérjük, próbálja újra.');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-black font-semibold mb-4">Munkatapasztalatok</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="p-4 bg-gray-100 rounded-md shadow-md">
            {editingId === experience.id ? (
              <form onSubmit={handleEditSubmit}>
                <div>
                  <label className="block text-gray-700 font-semibold">Cég:</label>
                  <input
                    type="text"
                    name="company"
                    value={editFormData.company}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Pozíció:</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Időtartam:</label>
                  <input
                    type="text"
                    name="interval"
                    value={editFormData.interval}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="mt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700"
                    disabled={isModifyFetching}
                  >
                    {isModifyFetching ? 'Mentés...' : 'Mentés'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="ml-2 bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
                  >
                    Mégse
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{experience.company}</h3>
                <p className="text-gray-700">{experience.title}</p>
                <p className="text-gray-700">{experience.interval}</p>
                <button
                  onClick={() => handleEdit(experience)}
                  className="mt-2 bg-yellow-600 text-white py-1 px-2 rounded-md hover:bg-yellow-700"
                >
                  Szerkesztés
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  disabled={isFetching}
                >
                  {isFetching ? 'Törlés...' : 'Törlés'}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserExperiences;
