import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers } from "../Features/TeacherSlice";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./UserTeachers.css";

const BookTeachers = () => {
  const teachers = useSelector((state) => state.teachers.teachers);
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleHourChange = (email, hours) => {
    const teacher = teachers.find((t) => t.email === email);
    if (!teacher) return;
    setBookingData((prev) => ({
      ...prev,
      [email]: {
        hours,
        totalPrice: teacher.coursePrice * hours,
      },
    }));
  };

  const handleBooking = (teacher) => {
    const data = bookingData[teacher.email];
    if (!data?.hours || data.hours <= 0) {
      alert("Please enter a valid number of hours.");
      return;
    }

    navigate("/BookTeach", {
      state: {
        teacher: {
          name: teacher.name,
          email: teacher.email,
          subject: teacher.subject,
          phoneNumber: teacher.phoneNumber,
          imageUrl: teacher.imageUrl,
          pricePerHour: teacher.coursePrice,
        },
        hours: data.hours,
        totalPrice: data.totalPrice,
      },
    });
  };

  const handleLike = (email) => {
    setEvaluations((prev) => {
      const current = prev[email] || { like: false, dislike: false };
      return {
        ...prev,
        [email]: {
          like: !current.like,
          dislike: current.like ? current.dislike : false,
        },
      };
    });
  };

  const handleDislike = (email) => {
    setEvaluations((prev) => {
      const current = prev[email] || { like: false, dislike: false };
      return {
        ...prev,
        [email]: {
          like: current.dislike ? current.like : false,
          dislike: !current.dislike,
        },
      };
    });
  };

  return (
    <div className="user-teachers">
      {teachers.map((teacher) => (
        <div className="teacher-card" key={teacher.email}>
          <img src={teacher.imageUrl || "/default-teacher.png"} alt={teacher.name} />
          <h3>{teacher.name}</h3>
          <p>Subject: {teacher.subject}</p>
          <p>imageUrl: {teacher.imageUrl}</p>
          <p>Phone Number: {teacher.phoneNumber}</p>
          <p>Price per hour: {teacher.coursePrice} OMR</p>

          <input
            type="number"
            min="1"
            placeholder="Hours"
            value={bookingData[teacher.email]?.hours || ""}
            onChange={(e) =>
              handleHourChange(teacher.email, Number(e.target.value))
            }
          />

          <p>
            Total:{" "}
            {bookingData[teacher.email]?.totalPrice
              ? `${bookingData[teacher.email].totalPrice} OMR`
              : "0 OMR"}
          </p>

          <div className="evaluation-buttons">
            <FaThumbsUp
              className={`like-icon ${evaluations[teacher.email]?.like ? "active" : ""}`}
              onClick={() => handleLike(teacher.email)}
              title="Like"
            />
            <FaThumbsDown
              className={`dislike-icon ${evaluations[teacher.email]?.dislike ? "active" : ""}`}
              onClick={() => handleDislike(teacher.email)}
              title="Dislike"
            />
          </div>

          <button className="book-button" onClick={() => handleBooking(teacher)}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookTeachers;
