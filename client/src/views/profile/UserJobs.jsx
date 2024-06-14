import React, { useState } from 'react';
import {
  useDeleteJobByIdMutation,
  useModifyJobMutation,
  useAddJobMutation,
  useGetApplicantsForJobQuery,
} from '../../app/experienceApiSlice';
import JobForm from './JobForm';
import JobCard from './JobCard';
import Modal from './Modal';

const initialFormState = {
  company: '',
  position: '',
  description: '',
  salaryFrom: '',
  salaryTo: '',
  type: '',
  city: '',
  homeOffice: false,
};

const UserJobs = ({ jobs }) => {

  const [deleteJob, { isLoading: isDeleteJobFetching }] = useDeleteJobByIdMutation();
  const [modifyJob, { isLoading: isModifyJobFetching }] = useModifyJobMutation();
  const [addJob, { isLoading: isAddJobFetching }] = useAddJobMutation();
  const [editingJobId, setEditingJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editJobFormData, setEditJobFormData] = useState(initialFormState);
  const [newJobFormData, setNewJobFormData] = useState(initialFormState);
  const [deletingJobId, setDeletingJobId] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewJobFormData(initialFormState);
  };

  const handleJobEdit = (job) => {
    setEditingJobId(job.id);
    setEditJobFormData(job);
  };

  const handleOpenJobToSee = (job) => {
    setSelectedJobId(job.id);
  };

  const handleCancelJobEdit = () => {
    setEditingJobId(null);
    setEditJobFormData(initialFormState);
  };

  const handleJobEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditJobFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleJobEditSubmit = async (e) => {
    e.preventDefault();
    const editedData = {
      ...editJobFormData,
      homeOffice: !!editJobFormData.homeOffice,
      salaryFrom: Number(editJobFormData.salaryFrom),
      salaryTo: Number(editJobFormData.salaryTo)
    };
    console.log('Submitting edit form with data:', editedData);
    try {
      await modifyJob({ id: editingJobId, ...editedData }).unwrap();
      alert('Módosítás sikeres!');
      handleCancelJobEdit();
      window.location.reload();
    } catch (err) {
      console.error('Failed to modify job:', err);
      alert('Módosítás sikertelen. Kérjük, próbálja újra.');
    }
  };

  const handleJobDelete = async (id) => {
    try {
      setDeletingJobId(id);
      await deleteJob(id).unwrap();
      alert('Törlés sikeres!');
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Törlés sikertelen. Kérjük, próbálja újra.');
    } finally {
      setDeletingJobId(null);
    }
  };

  const handleNewJobChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewJobFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNewJobSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...newJobFormData,
      homeOffice: !!newJobFormData.homeOffice,
      salaryFrom: Number(newJobFormData.salaryFrom),
      salaryTo: Number(newJobFormData.salaryTo)
    };
    console.log('Submitting new job form with data:', newData);
    try {
      await addJob(newData).unwrap();
      alert('Állás sikeresen hozzáadva!');
      handleCloseModal();
      window.location.reload();
    } catch (err) {
      console.error('Failed to add job:', err);
      alert('Állás hozzáadása sikertelen. Kérjük, próbálja újra.');
    }
  };

  const { data: applicants, error, isLoading } = useGetApplicantsForJobQuery(selectedJobId, {
    skip: selectedJobId === null,
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-black font-semibold mb-4">Álláshirdetéseim</h2>
      <div className="mb-4">
        <button onClick={handleOpenModal} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
          Új állás hozzáadása
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={handleJobEdit}
            onDelete={handleJobDelete}
            onViewApplicants={handleOpenJobToSee}
            isDeleting={deletingJobId === job.id}
          />
        ))}
      </div>
      {editingJobId && (
        <Modal onClose={handleCancelJobEdit}>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Állás módosítása</h3>
          <JobForm
            formData={editJobFormData}
            handleChange={handleJobEditChange}
            handleSubmit={handleJobEditSubmit}
            handleCancel={handleCancelJobEdit}
            isFetching={isModifyJobFetching}
          />
        </Modal>
      )}
      {selectedJobId && (
        <div className="mt-8">
          <h2 className="text-2xl text-black font-semibold mb-4">Jelentkezők</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading applicants</p>
          ) : (
            <ul>
              {applicants.map((applicant) => (
                <li key={applicant.userId} className="text-black">{applicant.user.fullname}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Új állás hozzáadása</h3>
          <JobForm
            formData={newJobFormData}
            handleChange={handleNewJobChange}
            handleSubmit={handleNewJobSubmit}
            handleCancel={handleCloseModal}
            isFetching={isAddJobFetching}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserJobs;
