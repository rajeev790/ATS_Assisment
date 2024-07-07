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

export default (state, action) => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
        loading: false,
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
        loading: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case JOB_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: null,
        error: null,
        current: null,
      };
    default:
      return state;
  }
};