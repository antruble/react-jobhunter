import React from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useGetUserInfoByIdQuery, useGetUserExperiencesQuery, useGetJobsByUserIdQuery } from '../app/experienceApiSlice';
import UserProfile from './profile/UserProfile';
import UserExperiences from './profile/UserExperiences';
import UserJobs from './profile/UserJobs';

const ProfilePage = () => {
  const [cookies] = useCookies(['cookie-name']);
  if (!cookies.token) return <Navigate to="/" />;

  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);
  const { data: user, isLoading: isUserLoading } = useGetUserInfoByIdQuery(userId);
  const { data: userExperiences, isLoading: isUserExperiencesLoading } = useGetUserExperiencesQuery(userId);
  const { data: userJobs, isLoading: isUserJobsLoading } = useGetJobsByUserIdQuery(userId);

  if (isUserLoading || isUserExperiencesLoading || isUserJobsLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-4 p-4 bg-gray-800 text-teal-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-100">Profilom</h1>
      <div className="bg-gray-700 p-4 rounded-md shadow-md">
        <UserProfile user={user} />
      </div>
      {role === 'jobseeker' && (
        <div className="mt-4 bg-gray-700 p-4 rounded-md shadow-md">
          <UserExperiences experiences={userExperiences.data} />
        </div>
      )}
      {role === 'company' && (
        <div className="mt-4 bg-gray-700 p-4 rounded-md shadow-md">
          <UserJobs jobs={userJobs.data} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
