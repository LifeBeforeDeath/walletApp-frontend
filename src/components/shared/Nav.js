import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
const Nav = () => {
  const navigate = useNavigate();
  const logoutHandler = (event) => {
    localStorage.removeItem("userId");
    navigate("/");
  };
  const userId = getAuthToken();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Expense Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {userId && (
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={logoutHandler}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;
