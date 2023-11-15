export const GET_USERS_FETCH = "GET_USERS_FETCH";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const CREATE_USER_FETCH = "CREATE_USER_FETCH";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FETCH = "SIGN_OUT_FETCH";
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
export const ASSIGN_TASK_FETCH = "ASSIGN_TASK_FETCH";
export const ASSIGN_TASK_FAILED = "ASSIGN_TASK_FAILED";
export const ASSIGN_TASK_SUCCESS = "ASSIGN_TASK_SUCCESS";
export const ASSIGNED_TASKS_FETCH = "ASSIGNED_TASKS_FETCH";
export const ASSIGNED_TASKS_FAILED = "ASSIGNED_TASKS_FAILED";
export const ASSIGNED_TASKS_SUCCESS = "ASSIGNED_TASKS_SUCCESS";
export const RECIEVED_TASKS_SUCCESS = "RECIEVED_TASKS_SUCCESS";
export const RECIEVED_TASKS_FETCH = "RECIEVED_TASKS_FETCH";
export const RECIEVED_TASKS_FAILED = "RECIEVED_TASKS_FAILED";
export const MARK_TASK_COMPLETED_FETCH = "MARK_TASK_COMPLETED_FETCH";
export const MARK_TASK_CANCELLED_FETCH = "MARK_TASK_CANCELLED_FETCH";
export const MARK_ASSIGNED_TASK_COMPLETED_FETCH = "MARK_ASSIGNED_TASK_COMPLETED_FETCH";
export const MARK_ASSIGNED_TASK_CANCELLED_FETCH = "MARK_ASSIGNED_TASK_CANCELLED_FETCH";
export const EDIT_ASSIGNED_TASK_FETCH = "EDIT_ASSIGNED_TASK_FETCH";
export const EDIT_ASSIGNED_TASK_SUCCESS = "EDIT_ASSIGNED_TASK_SUCCESS";
export const EDIT_ASSIGNED_TASK_FAILED = "EDIT_ASSIGNED_TASK_FAILED";

export const getUsersFetch = (email, password) => ({
  type: GET_USERS_FETCH,
  payload: { email, password },
});

export const createUserFetch = (name, email, password) => ({
  type: CREATE_USER_FETCH,
  payload: { name, email, password },
});

export const signOutUser = () => ({
  type: SIGN_OUT_FETCH,
});

export const getTasksFetch = (currentUser) => {
  console.log("get tasks fetch:",currentUser);
  return ({
    type: GET_TASKS_FETCH,
    payload: currentUser,
  })
}

export const createTaskFetch = (taskname, description, priority, currentUser) => ({
  type: CREATE_TASK_FETCH,
  payload: {taskname, description, priority, currentUser},
})

export const deleteTaskFetch = (payload) => ({
  type: DELETE_TASK_FETCH,
  payload: payload,
})

export const editTaskFetch = (_id, taskname, description, priority, currentUser) => ({
  type: EDIT_TASK_FETCH,
  payload: {_id, taskname, description, priority, currentUser},
})

export const assignTaskFetch = (
  reciverEmail,
  taskname,
  description,
  priority,
  currentUser
) => ({
  type: ASSIGN_TASK_FETCH,
  payload: { reciverEmail, taskname, description, priority, currentUser },
});

export const assignedTasksFetch = (currentUser) => ({
  type: ASSIGNED_TASKS_FETCH,
  payload: {currentUser},
})

export const recievedTasksFetch = (currentUser) => ({
  type: RECIEVED_TASKS_FETCH,
  payload: { currentUser },
});

export const markTaskCompletedFetch = (taskId, currentUser) => ({
  type: MARK_TASK_COMPLETED_FETCH,
  payload: {taskId: taskId, currentUser: currentUser}
})

export const markTaskCancelledFetch = (taskId, currentUser) => ({
  type: MARK_TASK_CANCELLED_FETCH,
  payload: { taskId: taskId, currentUser: currentUser },
});

export const markAssignedTaskCompletedFetch = (taskId, currentUser) => ({
  type: MARK_ASSIGNED_TASK_COMPLETED_FETCH,
  payload: { taskId: taskId, currentUser: currentUser },
});

export const markAssignedTaskCancelledFetch = (taskId, currentUser) => ({
  type: MARK_ASSIGNED_TASK_CANCELLED_FETCH,
  payload: { taskId: taskId, currentUser: currentUser },
});

export const editAssignedTaskFetch = (_id, recieverEmail, taskName, description, priority, currentUser) => ({
  type: EDIT_ASSIGNED_TASK_FETCH,
  payload: {_id, recieverEmail, taskName, description, priority, currentUser}
})