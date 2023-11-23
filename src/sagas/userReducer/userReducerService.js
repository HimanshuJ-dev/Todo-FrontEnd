import axios from "axios";
import { call, put } from "redux-saga/effects";
import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    CREATE_USER_FAILED,
    SIGN_OUT_SUCCESS
} from "./userReducerActions";

export function* workGetUsersFetch(payload) {
  const response = axios
    .post("http://localhost:8080/login", {
      email: payload.email,
      password: payload.password,
    })
    .then((res) => res.data)
    .catch((err) => console.log("error occured:", err));
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
}

export function* workCreateUserFetch(payload) {
  const response = axios
    .put("http://localhost:8080/signup", {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    })
    .then((res) => res.data)
    .catch((err) => console.log("error occured:", err));;
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
}