import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import { updateTeacher } from "../Features/TeacherSlice";
import { TeacherSchema } from "../Validations/TeachersValidations";
import TeacherImage from "../Images/bg.png";

const UpdateTeacherPage = () => {
  const { email } = useParams();
  const dispatch = useDispatch();

  // grab the list of teachers from the store
  const { teachers, status } = useSelector((state) => state.teachers);
  const teacherData = teachers.find((t) => t.email === email);

  // local state for success message
  const [successMsg, setSuccessMsg] = useState("");

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(TeacherSchema),
  });

  // on mount, prefill the form
  useEffect(() => {
    if (teacherData) {
      reset({
        name: teacherData.name,
        subject: teacherData.subject,
        phoneNumber: teacherData.phoneNumber,
        coursePrice: teacherData.coursePrice,
        imageUrl: teacherData.imageUrl,
      });
    }
  }, [teacherData, reset]);

  // This is the only thing that matters for dispatch:
  const onSubmit = (data) => {
    // data === { name, subject, phoneNumber, coursePrice, imageUrl }
    dispatch(updateTeacher({ email, updatedData: data })).then((action) => {
      if (updateTeacher.fulfilled.match(action)) {
        setSuccessMsg("Teacher updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    });
  };

  if (!teacherData) {
    return <p className="text-center mt-5">Teacher not found.</p>;
  }

  return (
    <Container fluid className="p-0">
      <Row className="g-0 min-vh-100 d-flex">
        <Col lg="6">
          <img
            src={TeacherImage}
            alt="Update Teacher"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col lg="6" className="d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%", maxWidth: "500px" }}>
            <h2 className="mb-4" style={{ fontWeight: "bold" }}>
              Update Teacher
            </h2>
            {successMsg && <Alert color="success">{successMsg}</Alert>}

            {/* Name */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                {...register("name")}
              />
              <p className="text-danger">{errors.name?.message}</p>
            </div>

            {/* Subject */}
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Subject"
                {...register("subject")}
              />
              <p className="text-danger">{errors.subject?.message}</p>
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Phone Number"
                {...register("phoneNumber")}
              />
              <p className="text-danger">{errors.phoneNumber?.message}</p>
            </div>

            {/* Course Price */}
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Course Price"
                {...register("coursePrice")}
              />
              <p className="text-danger">{errors.coursePrice?.message}</p>
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <input
                className="form-control"
                placeholder="Image URL"
                {...register("imageUrl")}
              />
              <p className="text-danger">{errors.imageUrl?.message}</p>
            </div>

            <Button type="submit" color="dark" className="w-100" disabled={status === "loading"}>
              {status === "loading" ? "Updating..." : "Update Now"}
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateTeacherPage;
