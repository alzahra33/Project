import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { UserSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister as registerUser } from "../Features/UserSlice"; // rename to avoid conflict
import { Link, useNavigate } from "react-router-dom";
import l from "../Images/l.png";

const UserRegister = () => {
  const user = useSelector((state) => state.user?.user);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(UserSchemaValidation),
  });

  const onSubmit = async (data) => {
    setServerError("");
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }

    try {
      // Dispatch the thunk and unwrap result for success/failure
      const result = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        })
      ).unwrap();

      console.log("Registered:", result);
      navigate("/UserLogin");
    } catch (err) {
      setServerError(err || "Registration failed");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row w-75 shadow-lg"
        style={{ borderRadius: "30px", overflow: "hidden", backgroundColor: "white" }}
      >
        {/* Left side with image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={l}
            alt="register"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right side with form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <div className="text-center mb-4">
            <h2 style={{ fontFamily: "cursive" }}>PrivateTutor</h2>
          </div>

          <div className="d-flex justify-content-around mb-4">
            <Link to="/UserLogin" className="btn btn-link" style={{ color: "black" }}>
              Sign In
            </Link>
            <Link to="/UserRegister" className="btn btn-link text-decoration-underline" style={{ color: "black" }}>
              Sign Up
            </Link>
          </div>

          {serverError && <div className="alert alert-danger">{serverError}</div>}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-3 input-group">
              <span className="input-group-text bg-light">
                <FaUser />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <p className="text-danger small">{errors.email?.message}</p>

            {/* Password */}
            <div className="mb-3 input-group">
              <span className="input-group-text bg-light">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <p className="text-danger small">{errors.password?.message}</p>

            {/* Confirm Password */}
            <div className="mb-3 input-group">
              <span className="input-group-text bg-light">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
            </div>
            <p className="text-danger small">{errors.confirmPassword?.message}</p>

            {/* Submit Button */}
            <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Create Account"}
            </button>

            {/* Show user email after successful registration */}
            {user?.email && (
              <div className="alert alert-success mt-3 text-center">
                Registered as: <strong>{user.email}</strong>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
