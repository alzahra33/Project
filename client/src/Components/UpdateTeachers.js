import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacher, getTeachers } from "../Features/TeacherSlice";

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
    // If teachers not loaded, fetch them first
    if (!teachers.length) {
      dispatch(getTeachers());
    } else {
      // Find the teacher to update and prefill form
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
      <h2>Update Teacher: {email}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Subject:
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Course Price:
          <input
            name="coursePrice"
            type="number"
            value={formData.coursePrice}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Teacher</button>
      </form>
    </div>
  );
};

export default UpdateTeachers;
