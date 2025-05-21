import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getTeachers, deleteTeachers } from "../Features/TeacherSlice";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import "./Manage.css";

const ManageTeachers = () => {
  const teachers = useSelector((state) => state.teachers.teachers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      console.log("Deleting teacher with email:", email);
      dispatch(deleteTeachers(email));
    }
  };

  return (
  <div className="catalog-container">
    {teachers.map((teacher, index) => {
      if (!teacher) return null; // Skip if teacher is undefined/null

      return (
        <div className="card" key={`${teacher.email}-${index}`}>
          <div className="image-container">
            {/* Provide fallback image if imageUrl is missing */}
            <img src={teacher.imageUrl || "/default-teacher.png"} alt={teacher.name || "Teacher"} />
          </div>

          <h2 className="product-name">{teacher.name || "No Name"}</h2>
          <p className="description">Email: {teacher.email || "N/A"}</p>
          <p className="description">Subject: {teacher.subject || "N/A"}</p>
          <p className="description">phoneNumber: {teacher.phoneNumber || "N/A"}</p>
          <p className="price">{teacher.coursePrice ?? "N/A"} OMR</p>
          <p className="date">{teacher.createdAt ? moment(teacher.createdAt).fromNow() : "Unknown date"}</p>

          <div className="action-buttons">
            <FiEdit
              className="edit-icon"
              onClick={() => navigate(`/UpdateTeachers/${teacher.email}`)}
              title="Edit Teacher"
            />
            <button
              className="delete-button"
              onClick={() => handleDelete(teacher.email)}
              title="Delete Teacher"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      );
    })}
  </div>
);
};

export default ManageTeachers;
