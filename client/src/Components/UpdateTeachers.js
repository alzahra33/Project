import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacher, getTeachers } from "../Features/TeacherSlice";
import "./UpdateTeachers.css"; // import the CSS file

const UpdateTeachers = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teachers = useSelector((state) => state.teachers.teachers);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    coursePrice: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!teachers.length) {
      dispatch(getTeachers());
    } else {
      const teacher = teachers.find((t) => t.email === email);
      if (teacher) {
        setFormData({
          name: teacher.name || "",
          subject: teacher.subject || "",
          coursePrice: teacher.coursePrice || "",
          imageUrl: teacher.imageUrl || "",
        });
      }
    }
  }, [dispatch, email, teachers]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTeacher({ email, updatedData: formData })).unwrap();
      alert("Teacher updated successfully!");
      navigate("/manageTeachers");
    } catch (err) {
      alert("Failed to update teacher: " + err);
    }
  };

  return (
    <div className="update-teacher-container">
      <h2 className="update-teacher-title">Update Teacher: {email}</h2>
      <form onSubmit={handleSubmit} className="update-teacher-form">
        <label className="form-label">
          Name:
          <input
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-label">
          Subject:
          <input
            className="form-input"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-label">
          Course Price:
          <input
            className="form-input"
            name="coursePrice"
            type="number"
            value={formData.coursePrice}
            onChange={handleChange}
            required
            min="0"
          />
        </label>

        <label className="form-label">
          Image URL:
          <input
            className="form-input"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="update-button">Update Teacher</button>
      </form>
    </div>
  );
};

export default UpdateTeachers;
