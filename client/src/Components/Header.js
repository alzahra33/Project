import React, { useState } from "react";
import { Navbar, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo1.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import Location from "./Location";
import UserLogin from "./UserLogin";
import OwnerLogin from "./OwnerLogin";
import UserRegister from "./UserRegister";
import OwnerRegister from "./OwnerRigester";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  // Separate states for different modals
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [showUserRegister, setShowUserRegister] = useState(false);
  const [showOwnerRegister, setShowOwnerRegister] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
  const isUser = user?.role === "user";

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
            <>
             
              
              <Link to="/ManageTeachers">
                <Button style={buttonStyle}>Manage Teachers</Button>
              </Link>
              <Link to="/UserTeachers">
                <Button style={buttonStyle}>User Teachers</Button>
              </Link>
              <Link to="/AddTeachers">
                <Button style={buttonStyle}>Add Teachers</Button>
              </Link>
              <Link to="/UserRegister">
                    <Button style={buttonStyle}>UserRegister</Button>
                  </Link>
                  <Link to="/UserLogin">
                    <Button style={buttonStyle}>UserLogin</Button>
                  </Link>
                  <Link to="/OwnerLogin">
                    <Button style={buttonStyle}>OwnerLogin</Button>
                  </Link>
                  <Link to="/OwnerRegister">
                    <Button style={buttonStyle}>OwnerRegister</Button>
                  </Link>
                  <Link to="/Profile">
                    <Button style={buttonStyle}>Profile</Button>
                  </Link>
            </>
          ) : (
            <>
              {isUser && (
                <>
                  <Link to="/UserTeachers">
                    <Button style={buttonStyle}>User Teachers</Button>
                  </Link>
                  <Link to="/UserRegister">
                    <Button style={buttonStyle}>UserRegister</Button>
                  </Link>
                  <Link to="/BookTeach">
                    <Button style={buttonStyle}>Book Teachers</Button>
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
                  <Link to="/ManageTeachers">
                <Button style={buttonStyle}>Manage Teachers</Button>
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

      {/* Location always visible */}
      <Location />

      {/* Modals */}
      <UserLogin isOpen={showUserLogin} onClose={() => setShowUserLogin(true)} />
      <OwnerLogin isOpen={showOwnerLogin} onClose={() => setShowOwnerLogin(true)} />
      <UserRegister isOpen={showUserRegister} onClose={() => setShowUserRegister(true)} />
      <OwnerRegister isOpen={showOwnerRegister} onClose={() => setShowOwnerRegister(true)} />
    </div>
  );
};

export default Header;
