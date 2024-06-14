import React from 'react';

const JobCard = ({ job, onEdit, onDelete, onViewApplicants, isDeleting }) => (
  <div className="p-4 bg-gray-200 rounded-md shadow-md">
    <h3 className="text-xl font-semibold text-purple-600">{job.position}</h3>
    <div className="mt-2 grid grid-cols-2 gap-x-2 text-black">
      <span className="font-semibold">Cég:</span>
      <span>{job.company}</span>
      <span className="font-semibold">Leírás:</span>
      <span className='truncate'>{job.description}</span>
      <span className="font-semibold">Város:</span>
      <span>{job.city}</span>
      <span className="font-semibold">Fizetés:</span>
      <span>{job.salaryFrom} - {job.salaryTo} HUF</span>
      <span className="font-semibold">Típus:</span>
      <span>{job.type}</span>
      <span className="font-semibold">Home office:</span>
      <span>{job.homeOffice ? 'Lehetőség' : 'Nincs lehetőség'}</span>
    </div>
    <div className="mt-2 flex space-x-2">
      <button
        onClick={() => onViewApplicants(job)}
        className="bg-black text-white py-1 px-2 rounded-md hover:bg-yellow-700"
      >
        Megtekintés
      </button>
      <button
        onClick={() => onEdit(job)}
        className="bg-yellow-600 text-white py-1 px-2 rounded-md hover:bg-yellow-700"
      >
        Szerkesztés
      </button>
      <button
        onClick={() => onDelete(job.id)}
        className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
        disabled={isDeleting}
      >
        {isDeleting ? 'Törlés...' : 'Törlés'}
      </button>
    </div>
  </div>
);

export default JobCard;
