import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddTeachers } from "../Features/TeacherSlice";
import { TeacherSchema } from "../Validations/TeachersValidations";

const AddTeacher = () => {
  const { user } = useSelector((state) => state.users);

  const [successMsg, setSuccessMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");

    const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TeacherSchema),
  });

  const onSubmit = () => {
    const teacherData = {
      name,
      email,
      subject,
      coursePrice,
      phoneNumber,
      imageUrl,
    };

    dispatch(AddTeachers(teacherData)).then(() => {
      setSuccessMsg("Teacher added successfully!");
      setTimeout(() => setSuccessMsg(""), 3001);
    });

    // Clear input fields
    setName("");
    setEmail("");
    setSubject("");
    setCoursePrice("");
    setPhoneNumber("");
    setImageUrl("");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="adminPage">
          <p className="display-6">Add Teacher</p>
          {successMsg && <p className="text-success">{successMsg}</p>}
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Teacher email..."
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Teacher Name..."
                {...register("name")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p className="text-danger">{errors.name?.message}</p>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Subject..."
                {...register("subject")}
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
              <p className="text-danger">{errors.subject?.message}</p>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Image URL..."
                {...register("imageUrl")}
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
              />
              <p className="text-danger">{errors.imageUrl?.message}</p>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Phone number..."
                {...register("phoneNumber")}
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
              <p className="text-danger">{errors.phoneNumber?.message}</p>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Course Price..."
                {...register("coursePrice")}
                onChange={(e) => setCoursePrice(e.target.value)}
                value={coursePrice}
              />
              <p className="text-danger">{errors.coursePrice?.message}</p>
            </div>

            <Button type="submit" color="primary" className="mt-2">
              Save Teacher
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTeacher;
