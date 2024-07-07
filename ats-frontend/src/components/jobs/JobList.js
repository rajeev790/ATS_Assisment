import React, { useContext, useEffect } from 'react';
import JobContext from '../../context/job/jobContext';

const JobList = () => {
  const jobContext = useContext(JobContext);

  const { jobs, getJobs } = jobContext;

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Jobs</h2>
      <ul>
        {jobs &&
          jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default JobList;