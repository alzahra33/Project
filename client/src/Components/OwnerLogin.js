import {
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { OwnerLogin as ownerLoginThunk } from "../Features/OwnerSlice"; // ✅ renamed to avoid conflict
import { loginSchemaValidation } from "../Validations/LoginValidations";
import T from "../Images/T.png"; // Ensure this path is correct

const OwnerLogin = () => {
  const { user, msg, isLogin } = useSelector((state) => state.users); // Removed 'status' here
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const userData = {
      email,
      password,
    };
    dispatch(ownerLoginThunk(userData)); // ✅ use renamed thunk
    navigate("/");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, user, navigate]);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-75 shadow-lg" style={{ borderRadius: "30px", overflow: "hidden", backgroundColor: "white" }}>
        {/* Left side with image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={T}
            alt="login"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right side with form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <div className="text-center mb-4">
            <h2 style={{ fontFamily: "cursive" }}>PrivateTutor - Owner</h2>
          </div>

          <div className="d-flex justify-content-around mb-4">
            <Link to="/OwnerLogin" className="btn btn-link" style={{ color: "black" }}>
              Sign In
            </Link>
            <Link to="/OwnerRegister" className="btn btn-link text-decoration-underline" style={{ color: "black" }}>
              Sign Up
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-light">
                <FaUser />
              </span>
              <input
                 type="email"
      className="form-control"
      placeholder="email"
      autoComplete="email"
      
                {...register("email", {
                  onChange: (e) => setemail(e.target.value),
                })}
              />
            </div>
            <p className="error-text text-danger">{errors.email?.message}</p>

            <div className="mb-3 input-group">
              <span className="input-group-text bg-light">
                <FaLock />
              </span>
              <input
            type="password"
      className="form-control"
      placeholder="Password"
      autoComplete="current-password"

                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
              />
            </div>
            <p className="error-text text-danger">{errors.password?.message}</p>

            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>
          <Row>
            <h3>Server Response: {msg}</h3>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
