import React from 'react';

const JobCard = ({ job, onEdit, onDelete, onViewApplicants, isDeleting }) => (
  <div className="p-4 bg-gray-100 rounded-md shadow-md">
    <h3 className="text-xl font-semibold">{job.company}</h3>
    <h3 className="text-xl font-semibold">{job.position}</h3>
    <p className="text-gray-700">{job.description}</p>
    <p className="text-gray-700">{job.city}</p>
    <p className="text-gray-700">
      {job.salaryFrom} - {job.salaryTo} HUF
    </p>
    <p className="text-gray-700">{job.type}</p>
    <p className="text-gray-700">{job.homeOffice ? 'Home office lehetőség' : 'Nincs home office lehetőség'}</p>
    <button
      onClick={() => onViewApplicants(job)}
      className="mt-2 bg-black text-white py-1 px-2 rounded-md hover:bg-yellow-700"
    >
      Megtekintés
    </button>
    <button
      onClick={() => onEdit(job)}
      className="mt-2 bg-yellow-600 text-white py-1 px-2 rounded-md hover:bg-yellow-700"
    >
      Szerkesztés
    </button>
    <button
      onClick={() => onDelete(job.id)}
      className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
      disabled={isDeleting}
    >
      {isDeleting ? 'Törlés...' : 'Törlés'}
    </button>
  </div>
);

export default JobCard;