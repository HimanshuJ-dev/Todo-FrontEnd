import { all, call } from "redux-saga/effects";

import userReducerSaga from './userReducer/userReducerSagas';
import tasksReducerSaga from "./tasksReducer/tasksReducerSagas";
import assignedTasksReducerSaga from "./assignedTasksReducer/assignedTasksReducerSagas";

export function* rootSaga() {
    yield all([
        call(userReducerSaga),
        call(tasksReducerSaga),
        call(assignedTasksReducerSaga)
    ]);
}
