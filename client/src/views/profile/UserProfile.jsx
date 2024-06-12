import React from 'react';

const UserProfile = ({ user }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-gray-700 font-semibold">Teljes név:</label>
      <p className="mt-1 text-gray-900">{user.fullname}</p>
    </div>
    <div>
      <label className="block text-gray-700 font-semibold">Email:</label>
      <p className="mt-1 text-gray-900">{user.email}</p>
    </div>
    <div>
      <label className="block text-gray-700 font-semibold">Szerepkör:</label>
      <p className="mt-1 text-gray-900">{user.role === 'jobseeker' ? 'Munkavállaló' : 'Munkáltató'}</p>
    </div>
  </div>
);

export default UserProfile;
