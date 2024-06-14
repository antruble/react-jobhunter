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

  if (isLoading) return <p className="text-gray-500">Loading...</p>;

  if (!job) return <p className="text-red-500">Job not found</p>;

  const handleApply = async () => {
    try {
      console.log(job.id);
      await applyForJob({ jobId: job.id }).unwrap();
      alert('Jelentkezés elküldve!');
    } catch (err) {
      console.error('Application failed:', err);
      alert('A jelentkezés sikertelen volt. Kérjük, próbálja újra.');
    }
  };

  return (
    <div className="container w-3/5 mx-auto mt-16 p-6 py-0 bg-white text-black rounded-md border-red-600 border-x-2">
      <div className='w-full flex justify-center mb-8'>
        <div className='w-1/2 h-10 bg-gray-800 rounded-b-full'></div>
      </div>
      <div className='w-full flex justify-between items-center'>
        <h1 className="text-4xl font-bold mb-4 text-purple-600">{job.position}</h1>
          {role === 'jobseeker' && (
            <button
              onClick={handleApply}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Jelentkezés
            </button>
          )}
      </div>
      <p className="text-2xl text-black mb-2 font-semibold">{job.company}</p>
      <div className="grid grid-cols-1 gap-4">
        <div className='bg-gray-100 px-4 rounded-lg'>
          <p className="text-lg font-semibold">Város:</p>
          <p className="text-lg text-gray-700">{job.city}</p>
        </div>
        <div className='px-4'>
          <p className="text-lg font-semibold">Fizetés:</p>
          <p className="text-lg text-gray-700">{job.salaryFrom} - {job.salaryTo} HUF</p>
        </div>
        <div className='bg-gray-100 rounded-lg px-4'>
          <p className="text-lg font-semibold">Típus:</p>
          <p className="text-lg text-gray-700">{job.type}</p>
        </div>
        <div className=' px-4'>
          <p className="text-lg font-semibold">Home office:</p>
          <p className="text-lg text-gray-700">{job.homeOffice ? 'Igen' : 'Nem'}</p>
        </div>
        <div className='bg-gray-100 rounded-lg px-4 mb-8'>
          <p className="text-lg font-semibold">Leírás:</p>
          <p className="text-lg text-gray-700">{job.description}</p>
        </div>
      </div>
      
      <div className='w-full flex justify-center mt-8'>
        <div className='w-1/2 h-10 bg-gray-800 rounded-t-full'></div>
      </div>
      
    </div>
  );
};

export default JobDetailPage;
