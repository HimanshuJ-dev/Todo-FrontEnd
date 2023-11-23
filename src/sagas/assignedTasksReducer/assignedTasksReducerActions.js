export const ASSIGN_TASK_FETCH = "ASSIGN_TASK_FETCH";
export const ASSIGN_TASK_FAILED = "ASSIGN_TASK_FAILED";
export const ASSIGN_TASK_SUCCESS = "ASSIGN_TASK_SUCCESS";
export const ASSIGNED_TASKS_FETCH = "ASSIGNED_TASKS_FETCH";
export const ASSIGNED_TASKS_FAILED = "ASSIGNED_TASKS_FAILED";
export const ASSIGNED_TASKS_SUCCESS = "ASSIGNED_TASKS_SUCCESS";
export const MARK_ASSIGNED_TASK_COMPLETED_FETCH =
  "MARK_ASSIGNED_TASK_COMPLETED_FETCH";
export const MARK_ASSIGNED_TASK_CANCELLED_FETCH =
  "MARK_ASSIGNED_TASK_CANCELLED_FETCH";
export const EDIT_ASSIGNED_TASK_FETCH = "EDIT_ASSIGNED_TASK_FETCH";
export const EDIT_ASSIGNED_TASK_SUCCESS = "EDIT_ASSIGNED_TASK_SUCCESS";
export const EDIT_ASSIGNED_TASK_FAILED = "EDIT_ASSIGNED_TASK_FAILED";
export const RECIEVED_TASKS_SUCCESS = "RECIEVED_TASKS_SUCCESS";
export const RECIEVED_TASKS_FETCH = "RECIEVED_TASKS_FETCH";
export const RECIEVED_TASKS_FAILED = "RECIEVED_TASKS_FAILED";

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
  payload: { currentUser },
});

export const markAssignedTaskCompletedFetch = (taskId, currentUser) => ({
  type: MARK_ASSIGNED_TASK_COMPLETED_FETCH,
  payload: { taskId: taskId, currentUser: currentUser },
});

export const markAssignedTaskCancelledFetch = (taskId, currentUser) => ({
  type: MARK_ASSIGNED_TASK_CANCELLED_FETCH,
  payload: { taskId: taskId, currentUser: currentUser },
});

export const editAssignedTaskFetch = (
  _id,
  recieverEmail,
  taskName,
  description,
  priority,
  currentUser
) => ({
  type: EDIT_ASSIGNED_TASK_FETCH,
  payload: { _id, recieverEmail, taskName, description, priority, currentUser },
});

export const recievedTasksFetch = (currentUser) => ({
  type: RECIEVED_TASKS_FETCH,
  payload: { currentUser },
});