export const GET_TASKS_FETCH = "GET_TASKS_FETCH";
export const GET_TASKS_FAILED = "GET_TASKS_FAILED";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const CREATE_TASK_FETCH = "CREATE_TASK_FETCH";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILED = "CREATE_TASK_FAILED";
export const DELETE_TASK_FETCH = "DELETE_TASK_FETCH";
export const EDIT_TASK_FETCH = "EDIT_TASK_FETCH";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_FAILED = "EDIT_TASK_FAILED";
export const MARK_TASK_COMPLETED_FETCH = "MARK_TASK_COMPLETED_FETCH";
export const MARK_TASK_CANCELLED_FETCH = "MARK_TASK_CANCELLED_FETCH";

export const getTasksFetch = (currentUser) => {
  console.log("get tasks fetch:", currentUser);
  return {
    type: GET_TASKS_FETCH,
    payload: currentUser,
  };
};

export const createTaskFetch = (
  taskname,
  description,
  priority,
  currentUser
) => ({
  type: CREATE_TASK_FETCH,
  payload: { taskname, description, priority, currentUser },
});

export const deleteTaskFetch = (payload) => ({
  type: DELETE_TASK_FETCH,
  payload: payload,
});

export const editTaskFetch = (
  _id,
  taskname,
  description,
  priority,
  currentUser
) => ({
  type: EDIT_TASK_FETCH,
  payload: { _id, taskname, description, priority, currentUser },
});

export const markTaskCompletedFetch = (taskId, currentUser) => ({
  type: MARK_TASK_COMPLETED_FETCH,
  payload: { taskId: taskId, currentUser: currentUser },
});

export const markTaskCancelledFetch = (taskId, currentUser) => ({
  type: MARK_TASK_CANCELLED_FETCH,
  payload: { taskId: taskId, currentUser: currentUser },
});
