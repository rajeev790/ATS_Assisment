import React, { useState, useContext } from 'react';
import ApplicationContext from '../../context/application/applicationContext';

const ApplicationForm = ({ jobId }) => {
  const applicationContext = useContext(ApplicationContext);

  const { addApplication } = applicationContext;

  const [application, setApplication] = useState({
    resume: '',
    r1CheckResponses: '',
  });

  const { resume, r1CheckResponses } = application;

  const onChange = (e) =>
    setApplication({ ...application, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addApplication(jobId, application);
    setApplication({
      resume: '',
      r1CheckResponses: '',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Apply for Job</h2>
      <textarea
        placeholder='Resume'
        name='resume'
        value={resume}
        onChange={onChange}
      />
      <textarea
        placeholder='R1 Check Responses'
        name='r1CheckResponses'
        value={r1CheckResponses}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value='Apply'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ApplicationForm;