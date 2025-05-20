import { Row } from "reactstrap";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { UserLogin as login } from "../Features/UserSlice"; // ✅ renamed to avoid conflict
import { loginSchemaValidation } from "../Validations/LoginValidations";
import l from "../Images/l.png";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { msg, isLogin, user } = useSelector((state) => state.users);

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
    dispatch(login(userData)); // ✅ dispatch thunk
    navigate("/");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/UserLogin");
    }
  }, [isLogin, user, navigate]);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-75 shadow-lg" style={{ borderRadius: "30px", overflow: "hidden", backgroundColor: "white" }}>
        
        {/* Left side with image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={l}
            alt="login"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right side with form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <div className="text-center mb-4">
            <h2 style={{ fontFamily: "cursive" }}>PrivateTutor - User</h2>
          </div>

          <div className="d-flex justify-content-around mb-4">
            <Link to="/UserLogin" className="btn btn-link" style={{ color: "black" }}>
              Sign In
            </Link>
            <Link to="/UserRegister" className="btn btn-link text-decoration-underline" style={{ color: "black" }}>
              Sign Up
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-light">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                {...register("email", {
                  onChange: (e) => setEmail(e.target.value),
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
                {...register("password", {
                  onChange: (e) => setPassword(e.target.value),
                })}
              />
            </div>
            <p className="error-text text-danger">{errors.password?.message}</p>

            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>
          <Row>
            <h5>{msg}</h5>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
