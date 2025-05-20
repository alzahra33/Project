import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { OwnerRegister as registerOwnerThunk } from "../Features/OwnerSlice"; // ✅ Alias to avoid naming conflict
import { Link, useNavigate } from "react-router-dom";
import { UserSchemaValidation } from "../Validations/UserValidations";
import T from "../Images/T.png";

const OwnerRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    console.log(`data: ${userData}`);
    dispatch(registerOwnerThunk(userData)); // ✅ Using aliased thunk name
    navigate("/OwnerLogin");
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
            src={T}
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
            <Link to="/OwnerLogin" className="btn btn-link" style={{ color: "black" }}>
              Sign In
            </Link>
            <Link to="/OwnerRegister" className="btn btn-link text-decoration-underline" style={{ color: "black" }}>
              Sign Up
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-3 input-group">
              <input
  type="email"
  className="form-control"
  placeholder="Email"
  autoComplete="email"
  {...register("email")}


                {...register("email")}
              />
            </div>
            <p className="text-danger small">{errors.email?.message}</p>

            {/* Password */}
            <div className="mb-3 input-group">
              <input
  type="password"
  className="form-control"
  placeholder="Password"
  autoComplete="new-password"
  {...register("password")}


                {...register("password")}
              />
            </div>
            <p className="text-danger small">{errors.password?.message}</p>

            {/* Confirm Password */}
            <input
  type="password"
  className="form-control"
  placeholder="Confirm Password"
  autoComplete="new-password"
  {...register("confirmPassword")}


                {...register("confirmPassword")}
              />
          
            <p className="text-danger small">{errors.confirmPassword?.message}</p>

            <button className="btn btn-dark w-100" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerRegister;
