import { useDispatch, useSelector } from "react-redux";
import { deleteTaskFetch } from "../../sagas/tasksReducer/tasksReducerActions";
import { markAssignedTaskCancelledFetch, markAssignedTaskCompletedFetch, recievedTasksFetch } from "../../sagas/assignedTasksReducer/assignedTasksReducerActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const RecievedTasks = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const tasks = useSelector((state) => state.recievedTasks.tasks);

  useEffect(() => {
    dispatch(recievedTasksFetch(currentUser));
  }, []);

  const DeleteTask = (taskId, currentUser) => {
    console.log("currentUser from list:", currentUser);
    dispatch(deleteTaskFetch(taskId, currentUser));
  };

  const markTaskAsCompeleted = (taskId, currentUser) => {
    dispatch(markAssignedTaskCompletedFetch(taskId, currentUser));
  };
  const markTaskAsCancelled = (taskId, currentUser) => {
    dispatch(markAssignedTaskCancelledFetch(taskId, currentUser));
  };

  const taskList = tasks.map((task, index) => {
    return (
      <div className={`singleTaskContainer ${task.priority} ${task.status}`}>
        <Link className="linkMaker" state={task}>
          <div>
            <div className="singleTaskIdAndTitleCont">
              <div className={`singleTaskId ${task.priority} ${task.status}`}>
                <h1>#{index + 1}</h1>
              </div>
              <div className="singleTaskTitle">
                <h1>{task.title}</h1>
              </div>
            </div>
            <div
              className={`singleTaskBreakLine ${task.priority} ${task.status}`}
            />
            <div className="singleTaskReciever">
              <h4>From: {task.creatoremail}</h4>
            </div>
            <div
              className={`singleTaskPriority ${task.priority} ${task.status}`}
            >
              <h4>Priority: {task.priority}</h4>
              <h4>Status: {task.status}</h4>
            </div>
            <div className="singleTaskDescription">
              <h5>Description: {task.description}</h5>
            </div>
          </div>
        </Link>
        <div className="actionButtonsContainer">
          <div>
            <button
              className="actionButton deleteIcon"
              onClick={() => DeleteTask(task._id, currentUser)}
            >
              <i className="fa fa-trash importedIcon"></i>
            </button>
          </div>
          {task.status === "pending" && (
            <div>
              <button
                className="actionButton completedIcon"
                onClick={() => markTaskAsCompeleted(task._id, currentUser)}
              >
                <i className="fa fa-check importedIcon"></i>
              </button>
              <button
                className="actionButton cancelledIcon"
                onClick={() => markTaskAsCancelled(task._id, currentUser)}
              >
                <i className="fa fa-xmark importedIcon"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="taskListContainer">
      <h1 className="taskListPageTitle">RECIEVED TASKS</h1>
      <div>{taskList}</div>
    </div>
  );
};

export default RecievedTasks;
