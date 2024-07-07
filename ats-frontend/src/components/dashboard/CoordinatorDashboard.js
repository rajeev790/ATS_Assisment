import React from 'react';
import JobList from '../jobs/JobList';
import JobForm from '../jobs/JobForm';

const CoordinatorDashboard = () => {
  return (
    <div>
      <h1>Coordinator Dashboard</h1>
      <JobForm />
      <JobList />
    </div>
  );
};

export default CoordinatorDashboard;