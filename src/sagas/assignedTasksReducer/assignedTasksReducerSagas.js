import { call, put, takeEvery } from "redux-saga/effects";
import swal from "sweetalert";
import {
    ASSIGN_TASK_SUCCESS,
    ASSIGN_TASK_FAILED,
    ASSIGNED_TASKS_FAILED,
    ASSIGNED_TASKS_SUCCESS,
    ASSIGNED_TASKS_FETCH,
    RECIEVED_TASKS_FETCH,
    RECIEVED_TASKS_SUCCESS,
    RECIEVED_TASKS_FAILED,
    ASSIGN_TASK_FETCH,
    MARK_ASSIGNED_TASK_CANCELLED_FETCH,
    MARK_ASSIGNED_TASK_COMPLETED_FETCH,
    EDIT_ASSIGNED_TASK_FETCH
} from './assignedTasksReducerActions';
import axios from "axios";

async   function assignTask(payload) {
  // return fetch("http://localhost:8080/assign-task", {
  //   method: "POST",
  //   headers: { "content-Type": "application/json" },
  //   body: JSON.stringify({
  //     title: payload.taskname,
  //     description: payload.description,
  //     priority: payload.priority,
  //     creator: payload.currentUser,
  //     reciever: payload.reciverEmail,
  //   }),
  // }).then((response) => response.json());
  return await axios.post("http://localhost:8080/assign-task", {
    title: payload.taskname,
    description: payload.description,
    priority: payload.priority,
    creator: payload.currentUser,
    reciever: payload.reciverEmail,
  }).then(res => res.data)
    .catch(err => console.log("error occured:", err));
}

function* workAssignTaskFetch({ payload }) {
  const creationResponse = yield call(() => assignTask(payload));
  if (creationResponse.message === "task created") {
    yield put({ type: ASSIGN_TASK_SUCCESS });
  } else {
    yield put({ type: ASSIGN_TASK_FAILED });
  }
}

function assignedTasks(currentUser) {
  console.log("currentUser:", currentUser);
  // return fetch(`http://localhost:8080/assigned-Tasks/?id=${currentUser}`, {
  //   method: "GET",
  //   headers: { "content-Type": "application/json" },
  // }).then((response) => response.json());
  return axios.get(`http://localhost:8080/assigned-Tasks/?id=${currentUser}`)
    .then(res => res.data)
    .catch(err => console.log("error occured:", err));
}

function* workAssignedTasksFetch(payload) {
  const currentUser = payload.payload.currentUser;
  const response = yield call(() => assignedTasks(currentUser));
  if (response.tasks) {
    yield put({ type: ASSIGNED_TASKS_SUCCESS, tasks: response.tasks });
  } else if (response.message) {
    yield put({ type: ASSIGNED_TASKS_FAILED, error: response.message });
  } else {
    yield put({
      type: ASSIGNED_TASKS_FAILED,
      error: "500: Internal server error",
    });
  }
}

function assignedCompleteTask({ taskId }) {
  // return fetch(`http://localhost:8080/complete-assigned-task/?id=${taskId}`, {
  //   method: "GET",
  //   headers: { "content-Type": "application/json" },
  // }).then((res) => res.json());
  return axios
    .get(`http://localhost:8080/complete-assigned-task/?id=${taskId}`)
    .then((res) => res.data)
    .catch((err) => console.log("error occured:", err));
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
  // return fetch(`http://localhost:8080/cancel-assigned-task/?id=${taskId}`, {
  //   method: "GET",
  //   headers: { "content-Type": "application/json" },
  // }).then((res) => res.json());
  return axios
    .get(`http://localhost:8080/cancel-assigned-task/?id=${taskId}`)
    .then((res) => res.data)
    .catch((err) => console.log("error occured:", err));
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
  // return fetch(`http://localhost:8080/updated-assigned-task`, {
  //   method: "PUT",
  //   headers: { "content-Type": "application/json" },
  //   body: JSON.stringify({
  //     id: payload._id,
  //     reciever: payload.recieverEmail,
  //     title: payload.taskName,
  //     description: payload.description,
  //     priority: payload.priority,
  //     creator: payload.currentUser,
  //   }),
  // }).then((response) => response.json());
  return axios.put(`http://localhost:8080/updated-assigned-task`, {
    id: payload._id,
    reciever: payload.recieverEmail,
    title: payload.taskName,
    description: payload.description,
    priority: payload.priority,
    creator: payload.currentUser,
  }).then(res => res.data)
    .catch(err => console.log("error occured:", err));
}

function* workEditAssignedTaskFetch(payload) {
  const creationResponse = yield call(() => editAssignedTask(payload.payload))
  if (creationResponse.message === "product updated") {
    swal("Task updated");
  } else {
    swal("Task not Updated...please try again");
  }
};

function recievedTasks(currentUser) {
  console.log("currentUser:", currentUser);
  // return fetch(`http://localhost:8080/recieved-Tasks/?id=${currentUser}`, {
  //   method: "GET",
  //   headers: { "content-Type": "application/json" },
  // }).then((response) => response.json());
  return axios.get(`http://localhost:8080/recieved-Tasks/?id=${currentUser}`)
    .then(res => res.data)
    .catch(err => console.log("error occured:", err));
}

function* workRecievedTasksFetch(payload) {
  const currentUser = payload.payload.currentUser;
  const response = yield call(() => recievedTasks(currentUser));
  if (response.tasks) {
    yield put({ type: RECIEVED_TASKS_SUCCESS, tasks: response.tasks });
  } else if (response.message) {
    yield put({ type: RECIEVED_TASKS_FAILED, error: response.message });
  } else {
    yield put({
      type: RECIEVED_TASKS_FAILED,
      error: "500: Internal server error",
    });
  }
}

function* assignedTasksReducerSaga() {
    yield takeEvery(ASSIGN_TASK_FETCH, workAssignTaskFetch);
    yield takeEvery(ASSIGNED_TASKS_FETCH, workAssignedTasksFetch);
    yield takeEvery(MARK_ASSIGNED_TASK_COMPLETED_FETCH, workAssignedCompleteTaskFetch);
  yield takeEvery(MARK_ASSIGNED_TASK_CANCELLED_FETCH, workAssignedCancelTaskFetch);
    yield takeEvery(EDIT_ASSIGNED_TASK_FETCH, workEditAssignedTaskFetch);
    yield takeEvery(RECIEVED_TASKS_FETCH, workRecievedTasksFetch);
}

export default assignedTasksReducerSaga;