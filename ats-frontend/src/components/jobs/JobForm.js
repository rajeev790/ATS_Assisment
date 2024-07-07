import React, { useState, useContext, useEffect } from 'react';
import JobContext from '../../context/job/jobContext';

const JobForm = () => {
  const jobContext = useContext(JobContext);

  const { addJob, updateJob, clearCurrent, current } = jobContext;

  useEffect(() => {
    if (current !== null) {
      setJob(current);
    } else {
      setJob({
        title: '',
        description: '',
      });
    }
  }, [jobContext, current]);

  const [job, setJob] = useState({
    title: '',
    description: '',
  });

  const { title, description } = job;

  const onChange = (e) =>
    setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addJob(job);
    } else {
      updateJob(job);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Job' : 'Add Job'}</h2>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <textarea
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Job' : 'Add Job'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default JobForm;