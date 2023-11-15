import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignedTasksFetch, editAssignedTaskFetch } from "../../sagas/actions";

const EditAssignedTask = (props) => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    console.log(state);

  const currentUser = useSelector((state) => state.signInReducer.currentUser);
  const taskCreated = useSelector(
    (state) => state.assignedTasksReducer.taskCreated
  );

  const [recieverEmail, setRecieverEmail] = useState(state.recieveremail);
  const [taskName, setTaskName] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [priority, setPriority] = useState(state.priority);
  const [recieverEmailError, setRecieverEmailError] = useState("");
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the email address and password.
    if (recieverEmail.length < 1) {
      setRecieverEmailError("Please enter a Reciever Email");
    } else if (taskName.length < 1) {
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
        dispatch(
          editAssignedTaskFetch(
            state._id,
            recieverEmail,
            taskName,
            description,
            priority,
            currentUser
          )
        );
        dispatch(assignedTasksFetch(currentUser));
      console.log(taskCreated);
      if (taskCreated) {
        setTimeout(() => {
          navigate("/assigned-tasks");
        }, 1000);
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
    if (name === "taskReceiver") {
      setRecieverEmail(value);
    } else if (name === "title") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "priority") {
      setPriority(value);
    }
    // Clear the email and password errors.
    setRecieverEmailError("");
    setTaskNameError("");
    setDescriptionError("");
    setPriorityError("");
  };

  return (
    <div className="newTaskContainer">
      <div className="newTaskCard">
        <div>
          <h1>Edit Assigned Task</h1>
        </div>
        {recieverEmailError && (
          <p className="inputError">{recieverEmailError}</p>
              )}
              
        {taskNameError && <p className="inputError">{taskNameError}</p>}
        {descriptionError && <p className="inputError">{descriptionError}</p>}
        {priorityError && <p className="inputError">{priorityError}</p>}
        <form className="newTaskForm" onSubmit={handleSubmit}>
          <div className="newTaskFormInputContainer">
            <input
              className="inputBox"
              type="email"
              name="taskReceiver"
              placeholder="Assign to"
              value={recieverEmail}
              onChange={handleInputChange}
            />

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

export default EditAssignedTask;
