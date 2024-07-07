import React, { useReducer } from 'react';
import axios from 'axios';
import JobContext from './jobContext';
import jobReducer from './jobReducer';
import {
  GET_JOBS,
  ADD_JOB,
  DELETE_JOB,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_JOB,
  JOB_ERROR,
  CLEAR_JOBS,
} from '../types';

const JobState = (props) => {
  const initialState = {
    jobs: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Get Jobs
  const getJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');

      dispatch({
        type: GET_JOBS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Job
  const addJob = async (job) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/jobs', job, config);

      dispatch({
        type: ADD_JOB,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      await axios.delete(/api/jobs/${id});

      dispatch({
        type: DELETE_JOB,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Job
  const updateJob = async (job) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(/api/jobs/${job._id}, job, config);

      dispatch({
        type: UPDATE_JOB,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Set Current Job
  const setCurrent = (job) => {
    dispatch({ type: SET_CURRENT, payload: job });
  };

  // Clear Current Job
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Clear Jobs
  const clearJobs = () => {
    dispatch({ type: CLEAR_JOBS });
  };

  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        current: state.current,
        error: state.error,
        getJobs,
        addJob,
        deleteJob,
        updateJob,
        setCurrent,
        clearCurrent,
        clearJobs,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;