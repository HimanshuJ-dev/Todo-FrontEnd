import { combineReducers } from "redux";

import { signInReducer } from './userReducer/userReducer';
import { assignedTasksReducer } from "./assignedTasksReducer/assignedTasksReducer";
import { recievedTasksReducer } from "./assignedTasksReducer/assignedTasksReducer";
import { tasksReducer } from "./tasksReducer/tasksReducer";

export const rootReducer = combineReducers({
    user: signInReducer,
    tasks: tasksReducer,
    assignedTasks: assignedTasksReducer,
    recievedTasks: recievedTasksReducer
});
