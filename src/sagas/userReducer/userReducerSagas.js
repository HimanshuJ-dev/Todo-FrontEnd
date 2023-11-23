import { call, put, takeEvery } from "redux-saga/effects";
import {
    GET_USERS_FETCH,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    CREATE_USER_FETCH,
    CREATE_USER_FAILED,
    SIGN_OUT_FETCH,
    SIGN_OUT_SUCCESS
} from './userReducerActions';
import axios from "axios";

function usersFetch({ payload }) {
  // return fetch("http://localhost:8080/login", {
  //   method: "POST",
  //   headers: { "content-Type": "application/json" },
  //   body: JSON.stringify({
  //     email: payload.email,
  //     password: payload.password,
  //   }),
  // }).then((response) => response.json());
  return axios.post("http://localhost:8080/login", {
    email: payload.email,
    password: payload.password,
  }).then(res => res.data)
    .catch(err => console.log("error occured:", err));
}

function* workGetUsersFetch(payload) {
  const response = yield call(() => usersFetch(payload));
  if (response.userId) {
    yield put({
      type: GET_USERS_SUCCESS,
      currentUser: response.userId,
      name: response.name,
      error: null,
    });
  } else if (response.message) {
    yield put({ type: GET_USERS_FAILED, error: response.message });
  } else {
    yield put({ type: GET_USERS_FAILED, error: "500: Internal server error" });
  }
  //   yield put({ type: GET_USERS_SUCCESS, users });
}

function createUser({ payload }) {
  // return fetch("http://localhost:8080/signup", {
  //   method: "PUT",
  //   headers: { "content-Type": "application/json" },
  //   body: JSON.stringify({
  //     name: payload.name,
  //     email: payload.email,
  //     password: payload.password,
  //   }),
  // }).then((response) => response.json());
  return axios.put("http://localhost:8080/signup", {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  }).then(res => res.data)
    .catch(err => console.log("error occured:", err));
}

function* workCreateUserFetch(payload) {
  const response = yield call(() => createUser(payload));
  if (response.userId) {
    yield put({
      type: GET_USERS_SUCCESS,
      currentUser: response.userId,
      name: response.name,
      error: null,
    });
  } else if (response.message) {
    yield put({ type: CREATE_USER_FAILED, error: response.message });
  } else {
    yield put({
      type: CREATE_USER_FAILED,
      error: "500: Internal server error",
    });
  }
  //   yield put({ type: GET_USERS_SUCCESS, users });
}

function* workSignOutUser() {
  yield put({
    type: SIGN_OUT_SUCCESS,
  });
}

function* userReducerSaga() {
  yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
  yield takeEvery(CREATE_USER_FETCH, workCreateUserFetch);
  yield takeEvery(SIGN_OUT_FETCH, workSignOutUser);
}

export default userReducerSaga;
