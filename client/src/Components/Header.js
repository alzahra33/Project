import React from "react";
import { Button, Navbar } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo1.jpg";
import { logout } from "../Features/UserSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Link to="/UserLogin">
            <Button style={buttonStyle}>UserLogin</Button>
          </Link>
          <Link to="/OwnerLogin">
            <Button style={buttonStyle}>OwnerLogin</Button>
          </Link>
          <Link to="/UserTeachers">
            <Button style={buttonStyle}>UserTeachers</Button>
          </Link>
          <Link to="/Profile">
            <Button style={buttonStyle}>Profile</Button>
          </Link>
          <Link to="/File">
            <Button style={buttonStyle}>File</Button>
          </Link>
          <Link to="/Teachers">
            <Button style={buttonStyle}>Teachers</Button>
          </Link>
          <Link to="/Posts">
            <Button style={buttonStyle}>PostParticipate</Button>
          </Link>

          {/* ✅ Fixed logout button (no <Link> wrapper) */}
          <Button style={buttonStyle} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
