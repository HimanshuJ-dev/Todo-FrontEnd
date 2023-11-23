import {
    GET_TASKS_FETCH,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILED,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAILED
} from './tasksReducerActions';

const INITIAL_TASKS = {
  tasks: [],
  isTasksLoading: false,
  errorTasks: null,
  taskCreated: true,
};

export const tasksReducer = (state = INITIAL_TASKS, action) => {
  switch (action.type) {
    case GET_TASKS_FETCH:
      return {
        ...state,
        isTasksLoading: true,
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        isTasksLoading: false,
        errorTasks: null,
      };
    case GET_TASKS_FAILED:
      return {
        ...state,
        isTasksLoading: false,
        errorTasks: action.error,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        taskCreated: true,
      };
    case CREATE_TASK_FAILED:
      return {
        ...state,
        taskCreated: false,
      };
    default:
      return state;
  }
};