import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from './components/Navigation/Navigation.jsx';
import Home from './components/Home/Home.jsx';
import List from './components/List/List.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import EditTask from './components/EditTask/EditTask.jsx';
import NewTask from './components/NewTask/NewTask.jsx';
import NotLoggedIn from './components/Error/NotLoggedInError.jsx';
import AssignTask from './components/AssignTask/AssignTask.jsx';
import AssignedTasks from './components/AssignedTasks/AssignedTasks.jsx';
import RecievedTasks from './components/RecievedTasks/RecievedTasks.jsx';
import EditAssignedTask from './components/EditAssignedTask/EditAssignedTask.jsx';

function App() {

  const currentUser = useSelector((state) => state.signInReducer.currentUser);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="tasks/*"
          element={currentUser !== null ? <List /> : <NotLoggedIn />}
        />
        <Route
          path="assign-task/*"
          element={currentUser !== null ? <AssignTask /> : <NotLoggedIn />}
        />
        <Route
          path="assigned-tasks/*"
          element={currentUser !== null ? <AssignedTasks /> : <NotLoggedIn />}
        />
        <Route
          path="recieved-tasks/*"
          element={currentUser !== null ? <RecievedTasks /> : <NotLoggedIn />}
        />
        <Route
          path="new-task"
          element={currentUser !== null ? <NewTask /> : <NotLoggedIn />}
        />
        <Route
          path="edit-task"
          element={currentUser !== null ? <EditTask /> : <NotLoggedIn />}
        />
        <Route
          path="edit-assigned-task"
          element={
            currentUser !== null ? <EditAssignedTask /> : <NotLoggedIn />
          }
        />
        <Route
          path="signup"
          element={currentUser === null ? <SignUp /> : <List />}
        />
        <Route
          path="login"
          element={currentUser === null ? <Login /> : <List />}
        />
      </Routes>
    </div>
  );
}

export default App;
