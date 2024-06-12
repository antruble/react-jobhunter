import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobByIdQuery } from '../../app/jobsApiSlice';
import { useSelector } from 'react-redux';
import { useApplyForJobMutation } from '../../app/applicantsApiSlice';

const JobDetailPage = () => {
  const { id } = useParams();
  const { data: job, isLoading } = useGetJobByIdQuery(id);
  const [applyForJob] = useApplyForJobMutation();
  const role = useSelector((state) => state.auth.role);

  if (isLoading) return <p>Loading...</p>;

  if (!job) return <p>Job not found</p>;

  const handleApply = async () => {
    try {
        console.log(job.id)
      await applyForJob({ jobId: job.id }).unwrap();
      alert('Jelentkezés elküldve!');
    } catch (err) {
      console.error('Application failed:', err);
      alert('A jelentkezés sikertelen volt. Kérjük, próbálja újra.');
    }
  };

  return (
    <div className="container mx-auto mt-4 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">{job.position}</h1>
      <p className="text-xl text-gray-700">{job.company}</p>
      <p className="text-gray-700">{job.city}</p>
      <p className="text-gray-700">Fizetés: {job.salaryFrom} - {job.salaryTo} HUF</p>
      <p className="text-gray-700">Típus: {job.type}</p>
      <p className="text-gray-700">Home office: {job.homeOffice ? 'Igen' : 'Nem'}</p>
      <p className="text-gray-700 mt-4">{job.description}</p>
      {role === 'jobseeker' && (
        <button
          onClick={handleApply}
          className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Jelentkezés
        </button>
      )}
    </div>
  );
};

export default JobDetailPage;
