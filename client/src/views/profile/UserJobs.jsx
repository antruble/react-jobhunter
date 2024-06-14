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
      salaryTo: Number(editJobFormData.salaryTo),
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
      salaryTo: Number(newJobFormData.salaryTo),
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
      <h2 className="text-2xl text-teal-100 font-semibold mb-4">Álláshirdetéseim</h2>
      <div className="mb-4">
        <button onClick={handleOpenModal} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
          Új állás hozzáadása
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
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
          <h3 className="leading-6 font-bold text-2xl text-black pl-4 border-b-2 border-purple-500 pb-2">Állás módosítása</h3>
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
          <h2 className="text-2xl text-teal-100 font-semibold mb-4">Jelentkezők</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading applicants</p>
          ) : (
            <ul className="flex ">
              {applicants.map((applicant) => (
                <li key={applicant.userId} className="text-teal-100 font-semibold bg-purple-700 rounded-r-full px-4 py-2 mx-2 flex items-center justify-evenly">
                  <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" 
                    className="h-4 w-4 mr-2">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>profile [#1341]</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#fff">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298" id="profile-[#1341]"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  {applicant.user.fullname}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h3 className="leading-6 font-bold text-2xl text-black pl-4 border-b-2 border-purple-500 pb-2">Új állás hozzáadása</h3>
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
