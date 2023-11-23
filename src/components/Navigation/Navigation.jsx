import { Outlet, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";

import './Navigation.css';
import { signOutUser } from "../../sagas/userReducer/userReducerActions";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
  const isLoadingUser = useSelector(state => state.user.isLoading);
  const navigate = useNavigate();
  const username = useSelector(state => state.user.username);

    const signOutHandler = () => {
        console.log('sign out');
        dispatch(signOutUser(currentUser))
        navigate('/');
    };

    return (
      <Fragment>
        <div className="navigationContainer">
          <div className="logoContainer">
            <Link to="/">
              <img src="./logo512.png" alt="not yet" height="50px" />
            </Link>
            <Link className="navlink pageLinks usernameNavigation">{username}</Link>
          </div>
          <div className="navLinkContainer">
            {currentUser ? (
              <div>
                <Link className="navlink pageLinks" to="/new-task">
                  New Task
                </Link>
                <Link className="navlink pageLinks" to="/tasks">
                  Your Tasks
                </Link>
                <Link className="navlink pageLinks" to="/assign-task">
                  Assign Task
                </Link>
                <Link className="navlink pageLinks" to="/assigned-tasks">
                  Assigned Tasks
                </Link>
                <Link className="navlink pageLinks" to="/recieved-tasks">
                  Recieved Tasks
                </Link>

                <button
                  className="navlink signOutButton"
                  onClick={signOutHandler}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="loggedOutPageLinks">
                <Link className="navlink pageLinks" to="/login">
                  Login
                </Link>
                <Link className="navlink pageLinks" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="outletRenderWindow">
          {isLoadingUser ? (
            <div className="loadingScreenContainer">
              <h1>LOADING...</h1>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </Fragment>
    );
}

export default Navigation;