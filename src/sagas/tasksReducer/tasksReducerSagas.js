import { call, put, takeEvery } from "redux-saga/effects";
import swal from "sweetalert";
import {
  GET_TASKS_FETCH,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILED,
  CREATE_TASK_FETCH,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILED,
  DELETE_TASK_FETCH,
  EDIT_TASK_FETCH,
  MARK_TASK_COMPLETED_FETCH,
  MARK_TASK_CANCELLED_FETCH
} from "./tasksReducerActions";
import axios from "axios";

function getTasks(currentUser) {
  console.log("currentUser:", currentUser);
  // return fetch(`http://localhost:8080/tasks/?id=${currentUser}`, {
  //   method: "GET",
  //   headers: { "content-Type": "application/json" },
  // }).then((response) => response.json());
  console.log("axios working");
  return axios.get(`http://localhost:8080/tasks/?id=${currentUser}`)
    .then(res => res.data);
}

function* workGetTasksFetch({ payload }) {
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
  // return fetch("http://localhost:8080/new-task", {
  //   method: "POST",
  //   headers: { "content-Type": "application/json" },
  //   body: JSON.stringify({
  //     title: payload.taskname,
  //     description: payload.description,
  //     priority: payload.priority,
  //     creator: payload.currentUser,
  //   }),
  // }).then((response) => response.json());
  return axios.post(`http://localhost:8080/new-task`, {
    title: payload.taskname,
    description: payload.description,
    priority: payload.priority,
    creator: payload.currentUser,
  }).then(res => res.data)
    .catch(err => console.log("error occured: ", err));
}

function* workCreateTaskFetch(payload) {
  const creationResponse = yield call(() => createTask(payload.payload));
  if (creationResponse.message === "task created") {
    yield put({ type: CREATE_TASK_SUCCESS });
  } else {
    yield put({ type: CREATE_TASK_FAILED });
  }
}

function deleteTask({ taskId }) {
  // return fetch(`http://localhost:8080/delete-task/?id=${taskId}`, {
  //   method: "DELETE",
  //   headers: { "content-Type": "application/json" },
  // }).then((res) => res.json());
  return axios.delete(`http://localhost:8080/delete-task/?id=${taskId}`)
    .then(res => res.data)
    .catch(err => console.log("error occured:", err));
}

function* workDeleteTaskFetch({ payload }) {
  console.log("currentUser from deleteTask:", payload.currentUser);
  const deleteResponse = yield call(() => deleteTask(payload));
  console.log("response:", deleteResponse);
  if (deleteResponse) {
    if (deleteResponse.message === "task deleted") {
      swal("task deleted");
      yield put({ type: GET_TASKS_FETCH, payload: payload });
    } else {
      swal("could not delete task");
    }
  } else {
    swal("Some error occured");
  }
}

function editTask(payload) {
  // return fetch(`http://localhost:8080/edit-task`, {
  //   method: "PUT",
  //   headers: { "content-Type": "application/json" },
  //   body: JSON.stringify({
  //     id: payload._id,
  //     title: payload.taskname,
  //     description: payload.description,
  //     priority: payload.priority,
  //     creator: payload.currentUser,
  //   }),
  // }).then((response) => response.json());
  return axios.put(`http://localhost:8080/edit-task`, {
    id: payload._id,
    title: payload.taskname,
    description: payload.description,
    priority: payload.priority,
    creator: payload.currentUser,
  }).then(res => res.data)
    .catch(err => console.log("error wrong:", err));
}

function* workEditTaskFetch(payload) {
  const creationResponse = yield call(() => editTask(payload.payload));
  if (creationResponse.message === "product updated") {
    swal("Task updated");
  } else {
    swal("Task not Updated...please try again");
  }
}

function completeTask({ taskId }) {
  // return fetch(`http://localhost:8080/complete-task/?id=${taskId}`, {
  //   method: "GET",
  //   headers: { "content-Type": "application/json" },
  // }).then((res) => res.json());
  return axios.get(`http://localhost:8080/complete-task/?id=${taskId}`)
    .then(res => res.data)
    .catch(err => console.log("error occured:", err));
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
  // return fetch(`http://localhost:8080/cancel-task/?id=${taskId}`, {
  //   method: "GET",
  //   headers: { "content-Type": "application/json" },
  // }).then((res) => res.json());
  return axios.get(`http://localhost:8080/cancel-task/?id=${taskId}`)
    .then(res => res.data)
    .catch(err => console.log("error occured:", err));
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

function* tasksReducerSaga() {
  yield takeEvery(GET_TASKS_FETCH, workGetTasksFetch);
  yield takeEvery(CREATE_TASK_FETCH, workCreateTaskFetch);
  yield takeEvery(DELETE_TASK_FETCH, workDeleteTaskFetch);
  yield takeEvery(EDIT_TASK_FETCH, workEditTaskFetch);
  yield takeEvery(MARK_TASK_COMPLETED_FETCH, workCompleteTaskFetch);
  yield takeEvery(MARK_TASK_CANCELLED_FETCH, workCancelTaskFetch);
}

export default tasksReducerSaga;
