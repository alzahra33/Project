import React from "react";
import { Button, Navbar } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo1.jpg";
import { logout } from "../Features/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import Location from './Location';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const buttonStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
  };

  const isOwner = user?.role === "owner";
  const isRegularUser = user?.role === "user";

  return (
    <div className="shadow-sm">
      <Navbar
        style={{
          backgroundColor: "#4682B4",
          padding: "20px 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "50px", width: "auto", borderRadius: "8px" }}
          />
        </Link>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {!user ? (
            // Guest: show login buttons
            <>
              <Link to="/UserLogin">
                <Button style={buttonStyle}>UserLogin</Button>
              </Link>
              <Link to="/OwnerLogin">
                <Button style={buttonStyle}>OwnerLogin</Button>
              </Link>
            </>
          ) : (
            // Authenticated user views
            <>
              {isRegularUser && (
                <>
                  <Link to="/UserTeachers">
                    <Button style={buttonStyle}>UserTeachers</Button>
                  </Link>
                  <Link to="/BookTeach">
                    <Button style={buttonStyle}>BookTeachers</Button>
                  </Link>
                  <Link to="/Posts">
                    <Button style={buttonStyle}>PostParticipate</Button>
                  </Link>
                  <Link to="/Profile">
                    <Button style={buttonStyle}>Profile</Button>
                  </Link>
                </>
              )}

              {isOwner && (
                <>
                  <Link to="/Profile">
                    <Button style={buttonStyle}>Profile</Button>
                  </Link>
                  <Link to="/Teachers">
                    <Button style={buttonStyle}>Teachers</Button>
                  </Link>
                  <Link to="/Posts">
                    <Button style={buttonStyle}>PostParticipate</Button>
                  </Link>
                </>
              )}

              <Button style={buttonStyle} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </Navbar>
      <div>
        <Location />
      </div>
    </div>
  );
};

export default Header;
