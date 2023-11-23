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

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        {currentUser ? (<Route>
          <Route
          path="tasks/*"
          element={ <List /> }/>
        <Route
          path="assign-task/*"
          element={ <AssignTask /> }/>
        <Route
          path="assigned-tasks/*"
          element={ <AssignedTasks /> }/>
        <Route
          path="recieved-tasks/*"
          element={ <RecievedTasks /> }/>
        <Route
          path="new-task"
          element={ <NewTask /> }/>
        <Route
          path="edit-task"
          element={ <EditTask /> }/>
        <Route
          path="edit-assigned-task"
          element={<EditAssignedTask /> }
          /></Route>) : (<Route>
            <Route path='/*' element={ <NotLoggedIn /> } />
          </Route>)}
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
