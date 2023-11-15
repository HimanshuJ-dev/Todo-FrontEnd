import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_USER_FETCH,
    GET_USERS_FAILED,
    GET_USERS_FETCH,
  GET_USERS_SUCCESS,
  CREATE_USER_FAILED,
  SIGN_OUT_SUCCESS,
    SIGN_OUT_FETCH,
    GET_TASKS_FETCH,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILED,
    CREATE_TASK_FETCH,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAILED,
    DELETE_TASK_FETCH,
    EDIT_TASK_FETCH,
    ASSIGN_TASK_FETCH,
    ASSIGNED_TASKS_FETCH,
    ASSIGNED_TASKS_SUCCESS,
    ASSIGNED_TASKS_FAILED,
    ASSIGN_TASK_SUCCESS,
    ASSIGN_TASK_FAILED,
    RECIEVED_TASKS_FETCH,
    RECIEVED_TASKS_SUCCESS,
    RECIEVED_TASKS_FAILED,
    MARK_TASK_COMPLETED_FETCH,
    MARK_TASK_CANCELLED_FETCH,
    MARK_ASSIGNED_TASK_COMPLETED_FETCH,
    MARK_ASSIGNED_TASK_CANCELLED_FETCH,
    EDIT_ASSIGNED_TASK_FETCH
} from './actions';
import swal from 'sweetalert';

function usersFetch({ payload }) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  }).then((response) => response.json());
}

function* workGetUsersFetch(payload) {
  const response = yield call(() => usersFetch(payload));
  if (response.userId) {
    yield put({
      type: GET_USERS_SUCCESS,
      currentUser: response.userId,
      error: null,
    });
  } else if (response.message) {
    yield put({ type: GET_USERS_FAILED, error: response.message });
  } else {
    yield put({ type: GET_USERS_FAILED, error: "500: Internal server error" });
  }
  //   yield put({ type: GET_USERS_SUCCESS, users });
}

function createUser({payload}) {
  return fetch("http://localhost:8080/signup", {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    }),
  }).then((response) => response.json());
}

function* workCreateUserFetch(payload) {
  const response = yield call(() => createUser(payload));
  if (response.userId) {
    yield put({
      type: GET_USERS_SUCCESS,
      currentUser: response.userId,
      error: null,
    });
  } else if (response.message) {
    yield put({ type: CREATE_USER_FAILED, error: response.message });
  } else {
    yield put({ type: CREATE_USER_FAILED, error: "500: Internal server error" });
  }
  //   yield put({ type: GET_USERS_SUCCESS, users });
}

function* workSignOutUser() {
  yield put({
    type: SIGN_OUT_SUCCESS,
  })
}

function getTasks(currentUser) {
  console.log("currentUser:", currentUser)
  return fetch(`http://localhost:8080/tasks/?id=${currentUser}`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((response) => response.json());
}

function* workGetTasksFetch({payload}) {
  console.log("payload:", payload);
  const currentUser = payload;
  const response = yield call(() => getTasks(currentUser));
  if (response.tasks) {
    yield put({ type: GET_TASKS_SUCCESS, tasks: response.tasks });
  } else if (response.message) {
    yield put({ type: GET_TASKS_FAILED, error: response.message });
  } else {
    yield put({ type: GET_TASKS_FAILED, error: "500: Internal server error" });
  }
}

function createTask(payload) {
  return fetch("http://localhost:8080/new-task", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.taskname,
      description: payload.description,
      priority: payload.priority,
      creator: payload.currentUser,
    }),
  })
    .then((response) => response.json());
}

function* workCreateTaskFetch(payload) {
  const creationResponse = yield call(() => createTask(payload.payload))
  if (creationResponse.message === "task created") {
    yield put({ type: CREATE_TASK_SUCCESS });
  } else {
    yield put({ type: CREATE_TASK_FAILED });
  }
}

function deleteTask({ taskId }) {
  return fetch(`http://localhost:8080/delete-task/?id=${taskId}`, {
    method: "DELETE",
    headers: { "content-Type": "application/json" },
  }).then((res) => res.json());
}

function* workDeleteTaskFetch({ payload }) {
  console.log("currentUser from deleteTask:", payload.currentUser);
  const deleteResponse = yield call(() => deleteTask(payload))
  console.log("response:", deleteResponse);
  if(deleteResponse){if (deleteResponse.message === "task deleted") {
    swal("task deleted");
    yield put({ type: GET_TASKS_FETCH , payload: payload});
  } else {
    swal("could not delete task");
  }
  } else {
    swal('Some error occured');
  }
}

function editTask(payload) {
  return fetch(`http://localhost:8080/edit-task`, {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      id: payload._id,
      title: payload.taskname,
      description: payload.description,
      priority: payload.priority,
      creator: payload.currentUser,
    }),
  })
    .then((response) => response.json());
}

function* workEditTaskFetch(payload) {
  const creationResponse = yield call(() => editTask(payload.payload))
  if (creationResponse.message === "product updated") {
    swal("Task updated");
  } else {
    swal("Task not Updated...please try again");
  }
}

function assignTask(payload) {
  return fetch("http://localhost:8080/assign-task", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.taskname,
      description: payload.description,
      priority: payload.priority,
      creator: payload.currentUser,
      reciever: payload.reciverEmail
    }),
  }).then((response) => response.json());
}

function* workAssignTaskFetch({payload}) {
  const creationResponse = yield call(() => assignTask(payload))
  if (creationResponse.message === "task created") {
    yield put({ type: ASSIGN_TASK_SUCCESS });
  } else {
    yield put({ type: ASSIGN_TASK_FAILED });
  }
}

function assignedTasks(currentUser) {
  console.log("currentUser:", currentUser);
  return fetch(`http://localhost:8080/assigned-Tasks/?id=${currentUser}`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((response) => response.json());
}

function* workAssignedTasksFetch(payload) {
  const currentUser = payload.payload.currentUser;
  const response = yield call(() => assignedTasks(currentUser));
  if (response.tasks) {
    yield put({ type: ASSIGNED_TASKS_SUCCESS, tasks: response.tasks });
  } else if (response.message) {
    yield put({ type: ASSIGNED_TASKS_FAILED, error: response.message });
  } else {
    yield put({ type: ASSIGNED_TASKS_FAILED, error: "500: Internal server error" });
  }
}

function recievedTasks(currentUser) {
  console.log("currentUser:", currentUser);
  return fetch(`http://localhost:8080/recieved-Tasks/?id=${currentUser}`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((response) => response.json());
}

function* workRecievedTasksFetch(payload) {
  const currentUser = payload.payload.currentUser;
  const response = yield call(() => recievedTasks(currentUser));
  if (response.tasks) {
    yield put({ type: RECIEVED_TASKS_SUCCESS, tasks: response.tasks });
  } else if (response.message) {
    yield put({ type: RECIEVED_TASKS_FAILED, error: response.message });
  } else {
    yield put({ type: RECIEVED_TASKS_FAILED, error: "500: Internal server error" });
  }
}

function completeTask({ taskId }) {
  return fetch(`http://localhost:8080/complete-task/?id=${taskId}`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((res) => res.json());
}

function* workCompleteTaskFetch({ payload }) {
  const Response = yield call(() => completeTask(payload));
  if (Response) {
    if (Response.message === "task updated") {
      swal("Task Completed");
      yield put({ type: GET_TASKS_FETCH, payload: payload });
    } else {
      swal("Task not updated");
    }
  } else {
    swal("Some error occured");
  }
}

function cancelTask({ taskId }) {
  return fetch(`http://localhost:8080/cancel-task/?id=${taskId}`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((res) => res.json());
}

function* workCancelTaskFetch({ payload }) {
  const Response = yield call(() => cancelTask(payload));
  if (Response) {
    if (Response.message === "task updated") {
      swal("Task Cancelled!");
      yield put({ type: GET_TASKS_FETCH, payload: payload });
    } else {
      swal("Task not updated");
    }
  } else {
    swal("Some error occured");
  }
}

function assignedCompleteTask({ taskId }) {
  return fetch(`http://localhost:8080/complete-assigned-task/?id=${taskId}`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((res) => res.json());
}

function* workAssignedCompleteTaskFetch({ payload }) {
  const Response = yield call(() => assignedCompleteTask(payload));
  if (Response) {
    if (Response.message === "task updated") {
      swal("Task Completed");
      yield put({ type: RECIEVED_TASKS_FETCH, payload: payload });
      yield put({ type: ASSIGNED_TASKS_FETCH, payload: payload });
    } else {
      swal("Task not updated");
    }
  } else {
    swal("Some error occured");
  }
}

function assignedCancelTask({ taskId }) {
  return fetch(`http://localhost:8080/cancel-assigned-task/?id=${taskId}`, {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((res) => res.json());
}

function* workAssignedCancelTaskFetch({ payload }) {
  const Response = yield call(() => assignedCancelTask(payload));
  if (Response) {
    if (Response.message === "task updated") {
      swal("Task Cancelled!");
      yield put({ type: RECIEVED_TASKS_FETCH, payload: payload });
      yield put({ type: ASSIGNED_TASKS_FETCH, payload: payload });
    } else {
      swal("Task not updated");
    }
  } else {
    swal("Some error occured");
  }
}

function editAssignedTask(payload) {
  return fetch(`http://localhost:8080/updated-assigned-task`, {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      id: payload._id,
      reciever: payload.recieverEmail,
      title: payload.taskName,
      description: payload.description,
      priority: payload.priority,
      creator: payload.currentUser,
    }),
  }).then((response) => response.json());
}

function* workEditAssignedTaskFetch(payload) {
  const creationResponse = yield call(() => editAssignedTask(payload.payload))
  if (creationResponse.message === "product updated") {
    swal("Task updated");
  } else {
    swal("Task not Updated...please try again");
  }
};

function* mySaga() {
  yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
  yield takeEvery(CREATE_USER_FETCH, workCreateUserFetch);
  yield takeEvery(SIGN_OUT_FETCH, workSignOutUser);
  yield takeEvery(GET_TASKS_FETCH, workGetTasksFetch);
  yield takeEvery(CREATE_TASK_FETCH, workCreateTaskFetch);
  yield takeEvery(DELETE_TASK_FETCH, workDeleteTaskFetch);
  yield takeEvery(EDIT_TASK_FETCH, workEditTaskFetch);
  yield takeEvery(ASSIGN_TASK_FETCH, workAssignTaskFetch);
  yield takeEvery(ASSIGNED_TASKS_FETCH, workAssignedTasksFetch);
  yield takeEvery(RECIEVED_TASKS_FETCH, workRecievedTasksFetch);
  yield takeEvery(MARK_TASK_COMPLETED_FETCH, workCompleteTaskFetch);
  yield takeEvery(MARK_TASK_CANCELLED_FETCH, workCancelTaskFetch);
  yield takeEvery(MARK_ASSIGNED_TASK_COMPLETED_FETCH, workAssignedCompleteTaskFetch);
  yield takeEvery(MARK_ASSIGNED_TASK_CANCELLED_FETCH, workAssignedCancelTaskFetch);
  yield takeEvery(EDIT_ASSIGNED_TASK_FETCH, workEditAssignedTaskFetch);
}

export default mySaga;