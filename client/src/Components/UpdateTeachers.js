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
  const { teachers } = useSelector((state) => state.teachers);
  const teacherData = teachers.find((t) => t.email === email);

  // local state for success message
  const [successMsg, setSuccessMsg] = useState("");

  // form field state
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(TeacherSchema),
  });

  // on mount, prefill both state and RHF form fields
  useEffect(() => {
    if (!teacherData) return;

    setName(teacherData.name);
    setSubject(teacherData.subject);
    setPhoneNumber(teacherData.phoneNumber);
    setCoursePrice(teacherData.coursePrice);
    setImageUrl(teacherData.imageUrl);

    setValue("name", teacherData.name);
    setValue("subject", teacherData.subject);
    setValue("phoneNumber", teacherData.phoneNumber);
    setValue("coursePrice", teacherData.coursePrice);
    setValue("imageUrl", teacherData.imageUrl);
  }, [teacherData, setValue]);

  const onSubmit = () => {
    const updatedData = {
      name,
      subject,
      phoneNumber,
      coursePrice,
      imageUrl,
    };

    dispatch(updateTeacher({ email, updatedData }))
      .then(() => {
        setSuccessMsg("Teacher updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "80%", maxWidth: "500px" }}
          >
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
                {...register("name", {
                  onChange: (e) => setName(e.target.value),
                })}
                value={name}
              />
              <p className="text-danger">{errors.name?.message}</p>
            </div>

            {/* Subject */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                {...register("subject", {
                  onChange: (e) => setSubject(e.target.value),
                })}
                value={subject}
              />
              <p className="text-danger">{errors.subject?.message}</p>
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  onChange: (e) => setPhoneNumber(e.target.value),
                })}
                value={phoneNumber}
              />
              <p className="text-danger">{errors.phoneNumber?.message}</p>
            </div>

            {/* Course Price */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Course Price"
                {...register("coursePrice", {
                  onChange: (e) => setCoursePrice(e.target.value),
                })}
                value={coursePrice}
              />
              <p className="text-danger">{errors.coursePrice?.message}</p>
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                {...register("imageUrl", {
                  onChange: (e) => setImageUrl(e.target.value),
                })}
                value={imageUrl}
              />
              <p className="text-danger">{errors.imageUrl?.message}</p>
            </div>

            <Button type="submit" color="dark" className="w-100">
              Update Now
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateTeacherPage;
