import {
    GET_USERS_FAILED,
    GET_USERS_FETCH,
  GET_USERS_SUCCESS,
  CREATE_USER_FETCH,
  CREATE_USER_FAILED,
    CREATE_USER_SUCCESS,
    SIGN_OUT_SUCCESS,
  SIGN_OUT_FETCH,
  GET_TASKS_FETCH,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILED,
  CREATE_TASK_FETCH,
  CREATE_TASK_FAILED,
  CREATE_TASK_SUCCESS,
  ASSIGNED_TASKS_FETCH,
  ASSIGNED_TASKS_SUCCESS,
  ASSIGNED_TASKS_FAILED,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAILED,
  RECIEVED_TASKS_FETCH,
  RECIEVED_TASKS_SUCCESS,
  RECIEVED_TASKS_FAILED
} from "./actions";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  errorUser: null,
};

const INITIAL_TASKS = {
  tasks: [],
  isTasksLoading: false,
  errorTasks: null,
  taskCreated: true
}

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

export const signInReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        isLoading: false,
        errorUser: action.error,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorUser: action.error,
      };
    case SIGN_OUT_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    case CREATE_USER_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        isLoading: false,
        errorUser: action.error,
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errorUser: action.error,
      };
    default:
      return state;
  }
};

export const tasksReducer = (state = INITIAL_TASKS, action) => {
  switch (action.type) {
    case GET_TASKS_FETCH:
      return {
        ...state,
        isTasksLoading: true
      }
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        isTasksLoading: false,
        errorTasks: null
      }
    case GET_TASKS_FAILED:
      return {
        ...state,
        isTasksLoading: false,
        errorTasks: action.error
      }
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        taskCreated: true,
      }
    case CREATE_TASK_FAILED:
      return {
        ...state,
        taskCreated: false,
      }
    default:
      return state;
  }
}

export const assignedTasksReducer = (state = INITIAL_TASKS_ASSIGNED, action) => {
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
}

export const recievedTasksReducer = (state = INITIAL_TASKS_RECIEVED, action) => {
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
}