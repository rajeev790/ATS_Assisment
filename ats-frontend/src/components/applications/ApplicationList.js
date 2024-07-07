import React, { useContext, useEffect } from 'react';
import ApplicationContext from '../../context/application/applicationContext';

const ApplicationList = () => {
  const applicationContext = useContext(ApplicationContext);

  const { applications, getApplications } = applicationContext;

  useEffect(() => {
    getApplications();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Applications</h2>
      <ul>
        {applications &&
          applications.map((application) => (
            <li key={application._id}>
              <h3>{application.jobId.title}</h3>
              <p>{application.resume}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ApplicationList;