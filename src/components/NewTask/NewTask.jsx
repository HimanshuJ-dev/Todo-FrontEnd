import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './NewTask.css';
import { createTaskFetch } from "../../sagas/tasksReducer/tasksReducerActions";

const NewTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const currentUser = useSelector((state) => state.user.currentUser);
    const taskCreated = useSelector((state) => state.tasks.taskCreated);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the email address and password.
    if (taskName.length < 1) {
      setTaskNameError("Please enter a title");
    } else if (
      priority !== "normal" &&
      priority !== "high" &&
      priority !== "urgent"
    ) {
      console.log(priority);
      setPriorityError("Please set a priority");
    } else if (description.length < 1) {
      setDescriptionError("Please Enter a description");
    } else {
      // Fetch the user data from an API.
        dispatch(createTaskFetch(taskName, description, priority, currentUser));
        console.log(taskCreated);
        if (taskCreated) {
            navigate("/tasks")
        } else {
            alert("task not created, please try again");
        }
    }
  };

  // Add a function to clear the errors when the input values change.
  const handleInputChange = (e) => {
    // Get the name and value of the input element.
    const { name, value } = e.target;
    // Set the state of the corresponding input value.
    if (name === "title") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "priority") {
      setPriority(value);
    }
    // Clear the email and password errors.
    setTaskNameError("");
    setDescriptionError("");
    setPriorityError("");
  };

  return (
    <div className="newTaskContainer">
      <div className="newTaskCard">
        <div>
          <h1>Create a new Task</h1>
        </div>
        {taskNameError && <p className="inputError">{taskNameError}</p>}
        {descriptionError && <p className="inputError">{descriptionError}</p>}
        {priorityError && <p className="inputError">{priorityError}</p>}
        <form className="newTaskForm" onSubmit={handleSubmit}>
          <div className="newTaskFormInputContainer">
            <input
              className="inputBox"
              type="text"
              name="title"
              placeholder="Title"
              value={taskName}
              onChange={handleInputChange}
            />

            <select
              className="inputBox"
              type="text"
              placeholder="Priority"
              name="priority"
              value={priority}
              onChange={handleInputChange}
            >
              <option value="priority" selected hidden>
                --Choose Priority--
              </option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            <textarea
              className="inputBox"
              type="Text"
              name="description"
              placeholder="Description"
              rows={10}
              value={description}
              onChange={handleInputChange}
            />

            <button type="submit">Create Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
