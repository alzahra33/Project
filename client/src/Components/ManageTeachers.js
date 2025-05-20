import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getTeachers, deleteTeachers } from "../Features/TeacherSlice";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const ManageTeachers = () => {
  const teachers = useSelector((state) => state.teachers.teachers);
  const users = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  return (
    <div className="catalog-container">
      {teachers.map((teacher) => (
        <div className="card" key={teacher.email}>
          <div className="image-container">
            <img src={teacher.imageUrl} alt={teacher.name} />
          </div>

          <h2 className="product-name">{teacher.name}</h2>
          <p className="description">Email: {teacher.email}</p>
          <p className="description">Subject: {teacher.subject}</p>
          <p className="price">{teacher.coursePrice} OMR</p>
          <p className="date">{moment(teacher.createdAt).fromNow()}</p>

          {/* Edit and Delete buttons */}
          <div className="action-buttons">
            <FiEdit
              className="edit-icon"
              onClick={() => navigate(`/UpdateTeachers/${teacher.email}`)}
              title="Edit Teacher"
            />
            <button
              className="delete-button"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this teacher?")
                ) {
                  dispatch(deleteTeachers(teacher.email));
                }
              }}
              title="Delete Teacher"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageTeachers;
