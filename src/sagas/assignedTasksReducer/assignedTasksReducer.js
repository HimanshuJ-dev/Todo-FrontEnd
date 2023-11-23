import {
    ASSIGNED_TASKS_FETCH,
    ASSIGNED_TASKS_SUCCESS,
    ASSIGN_TASK_FAILED,
    ASSIGN_TASK_SUCCESS,
  ASSIGNED_TASKS_FAILED,
  RECIEVED_TASKS_FAILED,
  RECIEVED_TASKS_SUCCESS,
    RECIEVED_TASKS_FETCH
} from './assignedTasksReducerActions';

const INITIAL_TASKS_ASSIGNED = {
  tasks: [],
  isTasksLoading: false,
  errorTasks: null,
  taskCreated: true,
};

const INITIAL_TASKS_RECIEVED = {
  tasks: [],
  isTasksLoading: false,
  errorTasks: null,
  taskCreated: true,
};


export const assignedTasksReducer = (
  state = INITIAL_TASKS_ASSIGNED,
  action
) => {
  switch (action.type) {
    case ASSIGNED_TASKS_FETCH:
      return {
        ...state,
        isTasksLoading: true,
      };
    case ASSIGNED_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        isTasksLoading: false,
        errorTasks: null,
      };
    case ASSIGNED_TASKS_FAILED:
      return {
        ...state,
        isTasksLoading: false,
        errorTasks: action.error,
      };
    case ASSIGN_TASK_SUCCESS:
      return {
        ...state,
        taskCreated: true,
      };
    case ASSIGN_TASK_FAILED:
      return {
        ...state,
        taskCreated: false,
      };
    default:
      return state;
  }
};

export const recievedTasksReducer = (
  state = INITIAL_TASKS_RECIEVED,
  action
) => {
  switch (action.type) {
    case RECIEVED_TASKS_FETCH:
      return {
        ...state,
        isTasksLoading: true,
      };
    case RECIEVED_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        isTasksLoading: false,
        errorTasks: null,
      };
    case RECIEVED_TASKS_FAILED:
      return {
        ...state,
        isTasksLoading: false,
        errorTasks: action.error,
      };
    default:
      return state;
  }
};