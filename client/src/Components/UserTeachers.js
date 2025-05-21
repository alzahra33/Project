import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers, liketeachers } from "../Features/TeacherSlice";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./Manage.css"; // Or a separate UserTeachers.css

const UserTeachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teachers = useSelector((state) => state.teachers.teachers);
  const useremail = useSelector((state) => state.auth?.user?.email); // Prevent crash if auth is undefined

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleLike = (email) => {
    dispatch(liketeachers({ email, useremail }));
  };

  const handleBook = (teacherEmail) => {
    navigate(`/BookTeach/${teacherEmail}`); // Adjust route to match your app routing
  };

  return (
    <div className="catalog-container">
      {teachers.map((teacher, index) => {
        if (!teacher) return null;

        const likedByUser = teacher.likes?.users?.includes(useremail);

        return (
          <div className="card" key={`${teacher.email}-${index}`}>
            <div className="image-container">
              <img src={teacher.imageUrl || "/default-teacher.png"} alt={teacher.name || "Teacher"} />
            </div>

            <h2 className="product-name">{teacher.name || "No Name"}</h2>
            <p className="description">Email: {teacher.email || "N/A"}</p>
            <p className="description">Subject: {teacher.subject || "N/A"}</p>
            <p className="description">Phone: {teacher.phoneNumber || "N/A"}</p>
            <p className="price">{teacher.coursePrice ?? "N/A"} OMR</p>
            <p className="date">{teacher.createdAt ? moment(teacher.createdAt).fromNow() : "Unknown date"}</p>

            {/* Book Teacher button */}
            <button
              className="book-button"
              onClick={() => handleBook(teacher.email)}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Book Teacher
            </button>

            {/* Like button */}
            <button
              className="like-button"
              onClick={() => handleLike(teacher.email)}
              style={{
                color: likedByUser ? "green" : "gray",
                border: "none",
                background: "transparent",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <FaThumbsUp />
              <span>{teacher.likes?.count || 0}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserTeachers;
